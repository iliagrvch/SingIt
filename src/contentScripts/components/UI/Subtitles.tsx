import React, { useState, useEffect } from 'react'
import './Subtitles.css'

export type Caption = {
  start: number
  end: number
  text: string
}

const Subtitles: React.FC<{ subtitles: Caption[]; enabled: boolean }> = (
  props
) => {
  const id = 'song-subtitles'
  const ytdWatchFlexy = document.querySelector('ytd-watch-flexy')
  const ytp = document.querySelector('video')
  const [theaterMode, setTheaterMode] = useState<boolean>(
    ytdWatchFlexy.hasAttribute('theater')
  )
  const [currentCap, setCap] = useState<Caption>({ start: 0, end: 0, text: '' })

  //* Hanlding side effects *//
  useEffect(() => {
    setCap({ start: -1, end: -1, text: '' })
  }, [props.subtitles])

  //* Events listeners *//
  document
    .getElementsByClassName('ytp-size-button ytp-button')[0]
    .addEventListener('click', function () {
      let value = ytdWatchFlexy.hasAttribute('theater')
      if (theaterMode != !value) setTheaterMode(!value)
    })

  ytp.ontimeupdate = function (event) {
    let timing = (event.target as any).currentTime * 1000
    if (
      props.enabled &&
      props.subtitles &&
      !isInRange(timing, currentCap.start, currentCap.end)
    ) {
      const caption = props.subtitles.find((cap) => {
        return isInRange(timing, cap.start, cap.end)
      })

      if (caption)
        setCap({ start: caption.start, end: caption.end, text: caption.text })
    }
  }

  //* Methods *//
  function isInRange(value, start, end) {
    return value >= start && value <= end
  }
  return (
    <div
      hidden={!props.enabled}
      className={`subtitles-container ${theaterMode ? 'theater' : 'default'}`}
      id={id}
    >
      <span className="subtitles-text">{currentCap.text}</span>
    </div>
  )
}

export default Subtitles
