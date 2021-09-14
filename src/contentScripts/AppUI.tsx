import React, {
  useState,
  useEffect,
  Fragment,
  useReducer,
  useMemo,
} from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/UI/Menu'
import Subtitles from './components/UI/Subtitles'
import TextCard from './components/UI/TextCard'
import './AppUI.css'
import useHttp from './hooks/use-http'

const strDataReducer = function (
  state,
  action
): { value: string; dataStatus: string } {
  return { value: action.data, dataStatus: action.status }
}

const subsReducer = (state, action) => {
  return { value: action.data, dataStatus: action.status }
}

function AppUI() {
  const [songMeta, setSongMeta] = useState({
    title: 'Initial',
    artist: 'Initial',
  })
  const [title, setTitle] = useState('')
  const [subsEnabled, toggleSubs] = useState(false)
  const [lyricsEnabled, toggleLyrics] = useState(false)
  const [wikiEnabled, toggleWiki] = useState(false)
  const [subsState, dispatchSubs] = useReducer(subsReducer, {
    value: null,
    dataStatus: 'Loading',
  })
  const [lyricsState, dispatchLyrics] = useReducer(strDataReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const [wikiState, dispatchWiki] = useReducer(strDataReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const [spotifyState, dispatchSpotify] = useReducer(strDataReducer, {
    value: '',
    dataStatus: 'Loading',
  })

  const { error, sendRequest } = useHttp()

  const toggleBtns = useMemo(() => {
    return [
      {
        id: 'karaoke',
        name: 'Karaoke',
        dataStatus: subsState.dataStatus,
        toggleFn: toggleSubs,
      },
      {
        id: 'lyrics',
        name: 'Lyrics',
        dataStatus: lyricsState.dataStatus,
        toggleFn: toggleLyrics,
      },
      {
        id: 'wiki',
        name: 'About',
        dataStatus: wikiState.dataStatus,
        toggleFn: toggleWiki,
      },
    ]
  }, [
    subsState.dataStatus,
    lyricsState.dataStatus,
    wikiState.dataStatus,
    spotifyState.dataStatus,
    toggleWiki,
    toggleLyrics,
    toggleSubs,
  ])

  const linkBtns = useMemo(() => {
    return [
      {
        id: 'chords',
        name: 'Chords',
        dataStatus: getChordDataStatus(),
        url: getChordsLink(),
      },
      {
        id: 'spotify',
        name: 'Open in Spotify',
        dataStatus: spotifyState.dataStatus,
        url: spotifyState.value,
      },
    ]
  }, [
    subsState.dataStatus,
    lyricsState.dataStatus,
    wikiState.dataStatus,
    spotifyState.dataStatus,
  ])
  const subsArea = document.getElementById('ytd-player')
  const titleNode = document.querySelector('title')
  const observer = new MutationObserver(mutationHandler)
  observer.observe(titleNode, {
    childList: true,
  })

  //* Handling side effects *//

  useEffect(() => {
    parseTitle(titleNode.text)
  }, [])

  useEffect(() => {
    initAllStates()
    if (
      songMeta.title &&
      songMeta.artist &&
      songMeta.title !== 'Initial' &&
      songMeta.artist !== 'Initial'
    ) {
      fetchData()
    }
  }, [songMeta.title, songMeta.artist])

  //* Methods *//

  function getChordDataStatus() {
    let res = 'Loading'

    if (
      subsState.dataStatus === 'Not Available' &&
      wikiState.dataStatus === 'Not Available' &&
      lyricsState.dataStatus === 'Not Available' &&
      spotifyState.dataStatus === 'Not Available'
    ) {
      res = 'Not Available'
    } else {
      res =
        subsState.dataStatus === 'Ready' ||
        wikiState.dataStatus === 'Ready' ||
        lyricsState.dataStatus === 'Ready' ||
        spotifyState.dataStatus === 'Ready'
          ? 'Ready'
          : 'Loading'
    }

    return res
  }
  function initAllStates() {
    if (songMeta.artist && songMeta.title) {
      dispatchSubs({ data: null, status: 'Loading' })
      dispatchWiki({ data: '', status: 'Loading' })
      dispatchLyrics({ data: '', status: 'Loading' })
      dispatchSpotify({ data: '', status: 'Loading' })
    } else if (!songMeta.artist || !songMeta.title) {
      dispatchSubs({ data: null, status: 'Not Available' })
      dispatchWiki({ data: '', status: 'Not Available' })
      dispatchLyrics({ data: '', status: 'Not Available' })
      dispatchSpotify({ data: '', status: 'Not Available' })
    }
  }
  function getChordsLink() {
    let linkInjection = `${(songMeta.artist as String).replace(
      ' ',
      '%20'
    )}%20${(songMeta.title as String).replace(' ', '%20')}`

    return `https://www.ultimate-guitar.com/search.php?search_type=title&value=${linkInjection}`
  }

  function mutationHandler(mutations) {
    if (location.href.includes('youtube.com/watch'))
      setTitle(titleNode.textContent)
  }

  useEffect(() => {
    if (location.href.includes('youtube.com/watch'))
      parseTitle(titleNode.textContent)
  }, [title])
  function fetchData() {
    spotifyFetchHandler()
    wikiFetchHandler()
    subtitlesFetchHandler()
    lyricsFetchHandler()
  }

  function spotifyFetchHandler() {
    const requestPath = {
      default: `/spotify/track/url/${songMeta.artist}/${songMeta.title}`,
      reserve: `/spotify/track/url/${songMeta.title}/${songMeta.artist}`,
    }
    sendRequest(requestPath, (data, status) => {
      dispatchSpotify({ data: data, status: status })
    })
  }

  function subtitlesFetchHandler() {
    toggleSubs(false)
    const videoID = youtubeIdParser(window.location.href)
    const requestPath = {
      default: `/karaoke/${songMeta.artist}/${songMeta.title}/${videoID}`,
      reserve: null,
    }
    sendRequest(
      requestPath,
      (data, status) => {
        dispatchSubs({ data: data, status: status })
      },
      parseSubtitles,
      subtitlesValidation
    )
  }

  function lyricsFetchHandler() {
    toggleLyrics(false)
    const requestPath = {
      default: `/lyrics/${songMeta.artist}/${songMeta.title}`,
      reserve: `/lyrics/${songMeta.title}/${songMeta.artist}`,
    }
    sendRequest(requestPath, (data, status) => {
      dispatchLyrics({ data: data, status: status })
    })
  }

  function wikiFetchHandler() {
    toggleWiki(false)
    const requestPath = {
      default: `/wikipedia/${songMeta.artist}`,
      reserve: `/wikipedia/${songMeta.title}`,
    }
    sendRequest(
      requestPath,
      (data, status) => dispatchWiki({ data: data, status: status }),
      formatWiki,
      wikiValidation
    )
  }

  function parseSubtitles(responseData) {
    const subs = responseData.subtitles.map((sub) => {
      return {
        start: sub.start,
        end: sub.end,
        text: sub.text.replace(/<\/?[^>]+(>|$)/g, ' '),
      }
    })

    const media = document.querySelector('video')
    if (subs) {
      const res = [
        { start: 0, end: subs[0].start, text: '' },
        ...subs,
        {
          start: subs[subs.length - 1].end,
          end: media.duration * 1000,
          text: '',
        },
      ]

      return res
    }
  }

  function youtubeIdParser(url) {
    let regExp =
      /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i
    let match = url.match(regExp)
    return match && match[1].length == 11 ? match[1] : false
  }

  function wikiValidation(str) {
    return !str.includes('may refer to')
  }

  function subtitlesValidation(data) {
    const subsArray = data.subtitles
    if (subsArray) {
      return subsArray.every((el) => {
        return el.start && el.end && el.text
      })
    } else {
      return false
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
    let badgies = [
      'lyrics',
      'hd',
      'live',
      'concert',
      'hq',
      'official',
      'video',
      '- YouTube',
      'youtube',
    ]
    let resStr = titleStr.replace(/ *\([^)]*\) */g, '')
    resStr = resStr.replace(/ *\[[^\]]*]/g, '')
    badgies.forEach((str) => {
      const pattern = new RegExp(str, 'gi')
      resStr = resStr.replace(pattern, '')
    })

    if (resStr.includes('-') || resStr.includes(':')) {
      let splitChar = resStr.includes('-') ? '-' : ':'
      let [artistName, songName] = resStr.split(splitChar)
      artistName = artistName.trim()
      songName = songName.trim()
      if (artistName != songMeta.artist || songName != songMeta.title)
        setSongMeta({ artist: artistName, title: songName })
    } else {
      setSongMeta({ artist: '', title: '' })
    }
  }

  return (
    <Fragment>
      <Menu toggleBtns={toggleBtns} linkBtns={linkBtns} />
      <TextCard id="lyrics" header="Lyrics" enabled={lyricsEnabled}>
        {lyricsState.value}
      </TextCard>
      <TextCard id="about" header="About the author" enabled={wikiEnabled}>
        {wikiState.value}
      </TextCard>
      {ReactDOM.createPortal(
        <Subtitles enabled={subsEnabled} subtitles={subsState.value} />,
        subsArea
      )}
    </Fragment>
  )
}

export { AppUI }
