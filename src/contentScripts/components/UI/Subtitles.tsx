import React, { useState } from 'react'
import './Subtitles.css'

function Subtitles() {
  const classes = 'song-subtitles'

  let ytp = document.querySelector('video')
  const [currentSub, setCurrentSub] = useState('Before Start')

  ytp.addEventListener('timeupdate', function () {
    let timing = ytp.currentTime * 1000

    let subs = subExample['subtitles']
    if (
      timing >= subs[currentSubIdx].start &&
      timing <= subs[currentSubIdx].end
    ) {
      setCurrentSub(subs[currentSubIdx].text)
    } else if (
      timing > subs[currentSubIdx].end &&
      subs.length > currentSubIdx + 1
    ) {
      currentSubIdx++
      setCurrentSub(subs[currentSubIdx].text)
    }
  })
  return <div className={classes}>{currentSub}</div>
}

export default Subtitles

let subStrExample = `{
  "version_number": 10,
  "sub_format": "json",
  "subtitles": [
      {
          "start": 21975,
          "end": 25312,
          "text": "I'm tired of being what you want me to be",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 1
      },
      {
          "start": 25862,
          "end": 27911,
          "text": "Feeling so faithless",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 2
      },
      {
          "start": 27911,
          "end": 30159,
          "text": "Lost under the surface",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 3
      },
      {
          "start": 30702,
          "end": 34327,
          "text": "I don't know what you're expecting of me",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 4
      },
      {
          "start": 34327,
          "end": 36625,
          "text": "Put under the pressure",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 5
      },
      {
          "start": 36625,
          "end": 39425,
          "text": "Of walking in your shoes",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 6
      },
      {
          "start": 39425,
          "end": 42924,
          "text": "(Caught in the undertow, just caught in the undertow)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 7
      },
      {
          "start": 42924,
          "end": 48350,
          "text": "Every step that I take is another mistake to you...",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 8
      },
      {
          "start": 48350,
          "end": 52250,
          "text": "(Caught in the undertow, just caught in the undertow)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 9
      },
      {
          "start": 52250,
          "end": 54899,
          "text": "I've become so numb",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 10
      },
      {
          "start": 54899,
          "end": 57362,
          "text": "I can't feel you there",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 11
      },
      {
          "start": 57362,
          "end": 61415,
          "text": "Become so tired, so much more aware",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 12
      },
      {
          "start": 61415,
          "end": 65725,
          "text": "I'm becoming this, all I want to do",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 13
      },
      {
          "start": 65725,
          "end": 70154,
          "text": "Is be more like me and be less like you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 14
      },
      {
          "start": 70154,
          "end": 73727,
          "text": "Can't you see that you're smothering me?",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 15
      },
      {
          "start": 73937,
          "end": 75926,
          "text": "Holding too tightly",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 16
      },
      {
          "start": 75926,
          "end": 78632,
          "text": "Afraid to lose control",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 17
      },
      {
          "start": 78632,
          "end": 82356,
          "text": "'Cause everything that you thought I would be",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 18
      },
      {
          "start": 82356,
          "end": 84530,
          "text": "Has fallen apart",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 19
      },
      {
          "start": 84530,
          "end": 87994,
          "text": "Right in front of you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 20
      },
      {
          "start": 87994,
          "end": 90935,
          "text": "(Caught in the undertow, just caught in the undertow)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 21
      },
      {
          "start": 90935,
          "end": 96356,
          "text": "Every step that I take is another mistake to you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 22
      },
      {
          "start": 96356,
          "end": 99612,
          "text": "(Caught in the undertow, just caught in the undertow)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 23
      },
      {
          "start": 99612,
          "end": 104585,
          "text": "And every second I waste is more than I can take...",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 24
      },
      {
          "start": 104585,
          "end": 107274,
          "text": "I've become so numb",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 25
      },
      {
          "start": 107274,
          "end": 109640,
          "text": "I can't feel you there",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 26
      },
      {
          "start": 109640,
          "end": 114030,
          "text": "Become so tired, so much more aware",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 27
      },
      {
          "start": 114030,
          "end": 118100,
          "text": "I'm becoming this, all I want to do",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 28
      },
      {
          "start": 118100,
          "end": 123358,
          "text": "Is be more like me and be less like you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 29
      },
      {
          "start": 123358,
          "end": 125481,
          "text": "And I know",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 30
      },
      {
          "start": 125481,
          "end": 131952,
          "text": "I may end up failing too",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 31
      },
      {
          "start": 131952,
          "end": 134478,
          "text": "But I know",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 32
      },
      {
          "start": 134478,
          "end": 136263,
          "text": "You were just like me",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 33
      },
      {
          "start": 136263,
          "end": 141705,
          "text": "With someone disappointed in you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 34
      },
      {
          "start": 141705,
          "end": 144403,
          "text": "I've become so numb",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 35
      },
      {
          "start": 144403,
          "end": 146744,
          "text": "I can't feel you there",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 36
      },
      {
          "start": 146744,
          "end": 150910,
          "text": "Become so tired, so much more aware",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 37
      },
      {
          "start": 150910,
          "end": 155232,
          "text": "I'm becoming this, all I want to do",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 38
      },
      {
          "start": 155232,
          "end": 159122,
          "text": "Is be more like me and be less like you",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 39
      },
      {
          "start": 159122,
          "end": 163715,
          "text": "I've become so numb, I can't feel you there",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 40
      },
      {
          "start": 163715,
          "end": 167726,
          "text": "(I'm tired of being what you want me to be)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 41
      },
      {
          "start": 167726,
          "end": 172538,
          "text": "I've become so numb, I can't feel you there",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 42
      },
      {
          "start": 172538,
          "end": 176610,
          "text": "(I'm tired of being what you want me to be)",
          "meta": {
              "new_paragraph": false,
              "region": null
          },
          "position": 43
      }
  ],
  "author": {
      "id": "eAfaaLgGNxPpJ1kyXTXL2VWdbWufzEh_VnI2kZ5NiIo",
      "username": "CyrilW",
      "uri": "https://amara.org/api/users/id$eAfaaLgGNxPpJ1kyXTXL2VWdbWufzEh_VnI2kZ5NiIo/"
  },
  "language": {
      "code": "en",
      "name": "English",
      "dir": "ltr"
  },
  "title": "Linkin Park - Numb",
  "description": "",
  "metadata": {},
  "video_title": "Linkin Park - Numb",
  "video_description": "",
  "created": "2021-02-01T16:02:56Z",
  "actions_uri": "https://amara.org/api/videos/WxHfhGYyU09R/languages/en/subtitles/actions/",
  "notes_uri": "https://amara.org/api/videos/WxHfhGYyU09R/languages/en/subtitles/notes/",
  "resource_uri": "https://amara.org/api/videos/WxHfhGYyU09R/languages/en/subtitles/",
  "site_uri": "https://amara.org/en/videos/WxHfhGYyU09R/en/137629/11731596/"
}
`

let subExample = JSON.parse(subStrExample)
let currentSubIdx = 0
