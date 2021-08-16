import React, { useState, useEffect, Fragment } from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/UI/Menu'
import Lyrics from './components/UI/Lyrics'
import Subtitles from './components/UI/Subtitles'
import SongMetaContext from './components/context/song-meta-context'

function AppUI() {
  let [artist, setArtist] = useState('')
  let [song, setSong] = useState('')
  let [subsEnabled, toggleSubs] = useState(false)
  let [lyricsEnabled, toggleLyrics] = useState(false)
  let [areSubsAvailable, setSubsAvailable] = useState(false)
  let [areLyricsAvailable, setLyricsAvailable] = useState(false)
  let [wikiAvailable, setWikiAvailable] = useState(false)
  let header = `Now Playing : ${artist} - ${song}`
  let subsArea = document.getElementById('movie_player').children[0]
  //let more = document.getElementById('more')
  let btnCollection = document.getElementsByClassName(
    'more-button style-scope ytd-video-secondary-info-renderer'
  )
  let lessCollection = document.getElementsByClassName(
    'less-button style-scope ytd-video-secondary-info-renderer'
  )
  let titleNode = document.querySelector('title')

  // Event listeners

  let observer = new MutationObserver(mutationHandler)
  observer.observe(titleNode, {
    characterData: true,
    childList: true,
    characterDataOldValue: true,
  })
  useEffect(() => {
    parseTitle(titleNode.text)
  }, [])

  function initAllStates() {
    toggleSubs(false)
    toggleLyrics(false)
    setSubsAvailable(false)
    setLyricsAvailable(false)
  }

  function mutationHandler(mutations) {
    parseTitle(titleNode.text)
    initAllStates()
  }

  function parseTitle(titleStr) {
    let resStr = titleStr.replace(/ *\([^)]*\) */g, '')
    resStr = resStr.replace('Lyrics', '')
    resStr = resStr.replace(/ *\[[^\]]*]/g, '')
    let [artistName, songName] = resStr.split('-')
    artistName = artistName.trim()
    songName = songName.trim()
    setArtist(artistName)
    setSong(songName)
  }
  function datafetchhandler(value) {
    console.log(value)
    setSubsAvailable(value)
  }
  return (
    <Fragment>
      <h2 style={{ color: 'white' }}>{header}</h2>
      <SongMetaContext.Provider value={{ artistName: artist, songName: song }}>
        <Lyrics
          enabled={lyricsEnabled}
          songMeta={{ artistName: artist, songName: song }}
          reportDataFetchResults={setLyricsAvailable}
        ></Lyrics>
        <Menu
          artistName={artist}
          songName={song}
          lyricsAvailable={areLyricsAvailable}
          subsAvailable={areSubsAvailable}
          lyricstoggle={toggleLyrics}
          substoggle={toggleSubs}
        ></Menu>
        {ReactDOM.createPortal(
          <Subtitles
            songMeta={{ artistName: artist, songName: song }}
            enabled={subsEnabled}
            reportDataFetchResults={datafetchhandler}
          ></Subtitles>,
          subsArea
        )}
      </SongMetaContext.Provider>
    </Fragment>
  )
}

export { AppUI }
