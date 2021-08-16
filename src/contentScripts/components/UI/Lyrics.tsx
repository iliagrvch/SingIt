import React, { useState, useEffect, Fragment } from 'react'
import './Lyrics.css'
import axios from 'axios'
function Lyrics(props) {
  const id = 'singit-lyrics'
  let [isVisible, setIsVisible] = useState(false)
  let [lyrics, setLyrics] = useState('')

  async function fetchLyricsHandler() {
    try {
      const response = await axios.get(
        `https://youtubeextensionfinalprojectserver20210804205040.azurewebsites.net/Song/lyrics/${props.songMeta.artistName}/${props.songMeta.songName}`
      )
      console.log(response)
      const data = response.data

      if (data === 'There is no such song to that artist.') {
        props.reportDataFetchResults(false)
        setLyrics('')
      } else {
        props.reportDataFetchResults(true)
        setLyrics(data)
      }
    } catch (error) {
      props.reportDataFetchResults(false)
      setLyrics('')
    }
  }

  useEffect(() => {
    if (props.songMeta.artistName && props.songMeta.songName) {
      // fetchLyricsHandler()
    }
  }, [props.songMeta])

  return (
    <Fragment>
      <div id={id} hidden={false}>
        {lyrics}
      </div>
    </Fragment>
  )
}

export default Lyrics
