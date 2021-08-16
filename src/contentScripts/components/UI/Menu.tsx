import React, { useState, useEffect, useContext } from 'react'
import './Menu.css'
import axios from 'axios'

function Menu(props) {
  const classes = 'menu'
  function getChordsLink() {
    let linkInjection = `${(props.artistName as String).replace(
      ' ',
      '%20'
    )}%20${(props.songName as String).replace(' ', '%20')}`

    return `https://www.ultimate-guitar.com/search.php?search_type=title&value=${linkInjection}`
  }

  let [spotifyUrl, setSpotifyUrl] = useState('')

  async function fetchSpotifyHandler() {
    try {
      const response = await axios.get(
        `https://youtubeextensionfinalprojectserver20210804205040.azurewebsites.net/Song/spotify/track/url/${props.artistName}/${props.songName}`
      )
      console.log(response)
      const data = response.data

      if (data === 'There is no such song to that artist.') {
        setSpotifyUrl('')
      } else {
        setSpotifyUrl(data)
      }
    } catch (error) {
      setSpotifyUrl('')
    }
  }

  function componentWillRecieveProps(prevProps) {
    console.log('component update')
    console.log(props.songName)
    console.log(props.artistName)
    if (
      prevProps.songName != props.songName &&
      prevProps.artistName != props.artistName
    ) {
      if (props.songName && props.artistName) fetchSpotifyHandler()
    }
  }

  useEffect(() => {
    //  if (props.songName && props.artistName) fetchSpotifyHandler()
  }, [props.songName])

  function subsInputHandler() {
    console.log(
      (document.getElementById('karaoke-button') as HTMLInputElement).checked
    )
    props.substoggle(
      (document.getElementById('karaoke-button') as HTMLInputElement).checked
    )
  }

  function lyricsInputHandler() {
    props.lyricstoggle(
      (document.getElementById('lyrics-button') as HTMLInputElement).checked
    )
  }

  return (
    <div className={classes} id="app-menu">
      <label className="switch">
        <input
          onInput={subsInputHandler}
          type="checkbox"
          id="karaoke-button"
          disabled={!props.subsAvailable}
        ></input>
        <span className="slider">Karaoke</span>
      </label>
      <label className="switch">
        <input
          onInput={lyricsInputHandler}
          type="checkbox"
          id="lyrics-button"
          disabled={!props.lyricsAvailable}
        ></input>
        <span className="slider">Lyrics</span>
      </label>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={getChordsLink()}
        id="chords-button"
      >
        Chords
      </a>
      <a
        id="spotify-button"
        target="_blank"
        rel="noopener noreferrer"
        href={spotifyUrl}
      >
        Open in Spotify
      </a>
    </div>
  )
}

export default Menu
