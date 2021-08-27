import React, { useState, useEffect, useReducer } from 'react'
import './Subtitles.css'

const subReducer = (state, action) => {
  return { index: action.subIdx, value: action.content }
}

function Subtitles(props) {
  const id = 'song-subtitles'
  const ytdWatchFlexy = document.querySelector('ytd-watch-flexy')
  const ytp = document.querySelector('video')
  const [theaterMode, setTheaterMode] = useState(
    ytdWatchFlexy.hasAttribute('theater')
  )
  const [currentCap, setCap] = useState({ start: 0, end: 0, text: '' })

  useEffect(() => {
    setCap({ start: -1, end: -1, text: '' })
  }, [props.subtitles])

  document
    .getElementsByClassName('ytp-size-button ytp-button')[0]
    .addEventListener('click', function () {
      let value = ytdWatchFlexy.hasAttribute('theater')
      if (theaterMode != !value) setTheaterMode(!value)
    })

  // ytp.addEventListener('timeupdate', function () {
  //   console.log('timeupdate')
  //   if (props.subtitles) {
  //     let condition = shouldSearchNewSub()
  //     console.log(condition)
  //     if (props.enabled && condition) {
  //       ytp.removeEventListener('timeupdate', () => {})

  //       getCurrentSubBinarySearch(0, props.subtitles.length - 1)
  //     }
  //   }
  // })
  // useEffect(() => {
  //   let identifier
  //   if (props.subtitles) {
  //     const timing = ytp.currentTime * 1000
  //     const subs = props.subtitles
  //     let timeToNextSub
  //     switch (subState.index) {
  //       case -1:
  //         timeToNextSub = subs[0].start - timing
  //         identifier = setTimeout(() => {
  //           dispatchSub({ subIdx: 0, content: subs[0].text })
  //         }, timeToNextSub)
  //       case subs.length - 1:
  //         identifier = setTimeout(() => {
  //           timeToNextSub = subs[subState.index].end - timing
  //           dispatchSub({ subIdx: -2, content: '' })
  //         }, timeToNextSub)

  //       default:
  //         timeToNextSub = subs[subState.index + 1].start - timing
  //         identifier = setTimeout(() => {
  //           dispatchSub({
  //             subIdx: subState.index + 1,
  //             content: subs[subState.index + 1],
  //           })
  //         }, timeToNextSub)
  //     }
  // //   }
  //   return () => {
  //     clearTimeout(identifier)
  //   }
  // }, [subState.index, props.subtitles])
  ytp.ontimeupdate = function (event) {
    // console.log(props.subtitles)
    let timing = (event.target as any).currentTime * 1000
    if (
      props.enabled &&
      props.subtitles &&
      !isInRange(timing, currentCap.start, currentCap.end)
    ) {
      console.log('updatingsub')

      const caption = props.subtitles.find((cap) => {
        return isInRange(timing, cap.start, cap.end)
      })

      if (caption)
        setCap({ start: caption.start, end: caption.end, text: caption.text })
    }
  }
  function isInRange(value, start, end) {
    return value >= start && value <= end
  }
  // }
  // useEffect(() => {
  //   ytp.addEventListener('timeupdate', function (event) {
  //     console.log((event.target as any).currentTime)
  //     console.log(props.subtitles)
  //     //   if (props.enbaled && props.subtitles && shouldSearchNewSub())
  //     //   console.log('updating')
  //     //  let newSub =  props.subtitles.filter()

  //     return () => {
  //       ytp.removeEventListener('timeupdate', () => {})
  //     }
  //   })
  // }, [props.subtitles])

  // function getCurrentSubBinarySearch(start, end) {
  //   let timing = ytp.currentTime * 1000
  //   let mid = end - start
  //   let subs = props.subtitles
  //   let idx = Math.floor(mid)
  //   console.log('binary')
  //   if (idx < 0) return
  //   if (timing >= subs[idx].start && timing <= subs[idx].end) {
  //     dispatchSub({ subIdx: idx, content: subs[idx].text })
  //   } else if (timing < subs[idx].start) {
  //     if (idx > 0) {
  //       getCurrentSubBinarySearch(start, idx - 1)
  //     } else {
  //       dispatchSub({ subIdx: -1, content: '' })
  //     }
  //   } else if (timing > subs[idx].end) {
  //     if (idx < subs.length - 1) getCurrentSubBinarySearch(idx + 1, end)
  //     else {
  //       dispatchSub({ subIdx: -2, content: '' })
  //     }
  //   }
  // }

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
