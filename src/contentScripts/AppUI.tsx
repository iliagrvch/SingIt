import React, { useState, useEffect, Fragment, useReducer } from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/UI/Menu'
import Subtitles from './components/UI/Subtitles'
import TextCard from './components/UI/TextCard'
import axios from 'axios'
import './AppUI.css'

const wikiReducer = (state, action) => {
  return { value: action.data, dataStatus: action.status }
}
const subsReducer = (state, action) => {
  return { value: action.data, dataStatus: action.status }
}

const lyricsReducer = (state, action) => {
  return { value: action.data, dataStatus: action.status }
}

const spotifyReducer = (state, action) => {
  return { value: action.data, dataStatus: action.status }
}
function AppUI() {
  const [songMeta, setSongMeta] = useState({ title: '', artist: '' })
  const [subsEnabled, toggleSubs] = useState(false)
  const [lyricsEnabled, toggleLyrics] = useState(false)
  const [wikiEnabled, toggleWiki] = useState(false)
  const [subsState, dispatchSubs] = useReducer(subsReducer, {
    value: null,
    dataStatus: 'Loading',
  })
  const [lyricsState, dispatchLyrics] = useReducer(lyricsReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const [wikiState, dispatchWiki] = useReducer(wikiReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const [spotifyState, dispatchSpotify] = useReducer(spotifyReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const serverAddress =
    'https://youtubeextensionfinalprojectserver20210804205040.azurewebsites.net/Song'
  const subsArea = document.getElementById('ytd-player')
  const titleNode = document.querySelector('title')
  // Event listeners

  const observer = new MutationObserver(mutationHandler)
  observer.observe(titleNode, {
    childList: true,
  })
  useEffect(() => {
    parseTitle(titleNode.text)
  }, [])

  function initAllStates() {
    console.log('Init all states')
    dispatchSubs({ data: null, status: 'Loading' })
    dispatchWiki({ data: '', status: 'Loading' })
    dispatchLyrics({ data: '', status: 'Loading' })
    dispatchSpotify({ data: '', status: 'Loading' })
  }

  function mutationHandler(mutations) {
    if (location.href.includes('youtube.com/watch'))
      parseTitle(titleNode.textContent)
  }
  useEffect(() => {
    initAllStates()
    if (songMeta.title && songMeta.artist) {
      fetchData()
    }
  }, [songMeta.title, songMeta.artist])

  function fetchData() {
    wikiFetchHandler()
    subtitlesFetchHandler()
    lyricsFetchHandler()
    spotifyFetchHandler()
  }
  async function spotifyFetchHandler() {
    try {
      const response = await axios.get(
        `${serverAddress}/spotify/track/url/${songMeta.artist}/${songMeta.title}`
      )

      console.log(response)
      dispatchSpotify({ data: response.data, status: 'Ready' })
    } catch (error) {
      try {
        const reversedResponse = await axios.get(
          `${serverAddress}/spotify/track/url/${songMeta.title}/${songMeta.artist}`
        )
        dispatchSpotify({ data: reversedResponse.data, status: 'Ready' })
      } catch (error) {
        dispatchSpotify({ data: '', status: 'Not Available' })
      }
    }
  }

  async function subtitlesFetchHandler() {
    toggleSubs(false)
    const videoID = youtubeIdParser(window.location.href)
    dispatchSubs({ data: null, result: false })
    try {
      const response = await axios.get(
        `${serverAddress}/karaoke/${songMeta.artist}/${songMeta.title}/${videoID}`
      )
      console.log(response.data)
      let subs = response.data.subtitles.map((sub) => {
        return {
          start: sub.start,
          end: sub.end,
          text: sub.text.replace(/<\/?[^>]+(>|$)/g, ''),
        }
      })
      const media = document.querySelector('video')
      subs = [
        { start: 0, end: subs[0].start, text: '' },
        ...subs,
        {
          start: subs[subs.length - 1].end,
          end: media.duration * 1000,
          text: '',
        },
      ]
      console.log(subs)
      dispatchSubs({ data: subs, status: 'Ready' })
    } catch (error) {
      dispatchSubs({ data: null, status: 'Not Available' })
    }
  }

  async function lyricsFetchHandler() {
    toggleLyrics(false)
    try {
      const response = await axios.get(
        `${serverAddress}/lyrics/${songMeta.artist}/${songMeta.title}`
      )
      console.log(response.data)
      dispatchLyrics({ data: response.data, status: 'Ready' })
    } catch (error) {
      try {
        const reversedResponse = await axios.get(
          `${serverAddress}/lyrics/${songMeta.title}/${songMeta.artist}`
        )
        console.log(reversedResponse.data)
        dispatchLyrics({ data: reversedResponse.data, status: 'Ready' })
      } catch (error) {
        dispatchLyrics({ data: null, status: 'Not Available' })
      }
    }
  }
  function youtubeIdParser(url) {
    let regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i
    let match = url.match(regExp)
    return match && match[1].length == 11 ? match[1] : false
  }

  async function wikiFetchHandler() {
    toggleWiki(false)
    try {
      const response = await axios.get(
        `${serverAddress}/wikipedia/${songMeta.artist}`
      )
      if (response.data.includes('May refer to')) {
        throw 'multiple results'
      }
      const reversedResponse = await axios.get(
        `${serverAddress}/wikipedia/${songMeta.title}`
      )
      console.log(response)
      console.log(reversedResponse)
      const data =
        response.data.length > reversedResponse.data.length
          ? formatWiki(response.data)
          : formatWiki(reversedResponse.data)

      dispatchWiki({ status: 'Ready', data: data })
    } catch (error) {
      try {
        const reversedResponse = await axios.get(
          `${serverAddress}/wikipedia/${songMeta.title}`
        )
        if (reversedResponse.data.includes('May refer to')) {
          throw 'multiple results'
        }
        dispatchWiki({
          status: 'Ready',
          data: formatWiki(reversedResponse.data),
        })
      } catch (error) {
        dispatchWiki({ status: 'Not Available', data: '' })
      }
    }
  }

  function formatWiki(str) {
    const maxWordsInP = 100
    let arr = str.split(' ')
    let res = ''
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      count++
      res = res.concat(` ${arr[i]}`)
      if (count >= maxWordsInP && arr[i].includes('.')) {
        res = res.concat('\n\n')
        count = 0
      }
    }

    return res
  }
  function parseTitle(titleStr) {
    let resStr = titleStr.replace(/ *\([^)]*\) */g, '')
    resStr = resStr.replace('Lyrics', '')
    resStr = resStr.replace(/ *\[[^\]]*]/g, '')
    let [artistName, songName] = resStr.split('-')
    artistName = artistName.trim()
    songName = songName.trim()
    if (artistName != songMeta.artist || songName != songMeta.title)
      setSongMeta({ artist: artistName, title: songName })
  }
  return (
    <Fragment>
      <Menu
        artistName={songMeta.artist}
        songTitle={songMeta.title}
        lyricsDataStatus={lyricsState.dataStatus}
        subsDataStatus={subsState.dataStatus}
        wikiDataStatus={wikiState.dataStatus}
        spotifyDataStatus={spotifyState.dataStatus}
        lyricstoggle={toggleLyrics}
        substoggle={toggleSubs}
        wikitoggle={toggleWiki}
        spotifyUrl={spotifyState.value}
      ></Menu>
      <TextCard id="lyrics" header="Lyrics" enabled={lyricsEnabled}>
        {lyricsState.value}
      </TextCard>
      <TextCard id="about" header="About the author" enabled={wikiEnabled}>
        {wikiState.value}
      </TextCard>
      {ReactDOM.createPortal(
        <Subtitles
          enabled={subsEnabled}
          subtitles={subsState.value}
        ></Subtitles>,
        subsArea
      )}
    </Fragment>
  )
}

export { AppUI }
