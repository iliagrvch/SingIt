import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Menu from './components/UI/Menu'
import TextBox from './components/UI/TextBox'
import Subtitles from './components/UI/Subtitles'

let media = document.querySelector('video')

// function AddSubtitles() {
//   let container = media
//   console.log(container)

//   class SubtitleContainer extends React.Component {
//     render() {
//       return (
//         <div id="SubtitleContainer">
//           <TextBox className="subtitle-container">dsds</TextBox>
//         </div>
//       )
//     }
//   }
//   // document.querySelector('video').play()
//   const root1 = document.createElement('div')
//   container.appendChild(root1)
//   ReactDOM.render(<SubtitleContainer />, container)
// }

function AppUI() {
  let lyrics = `When the days are cold and the cards all fold
    And the saints we see are all made of gold
    When your dreams all fail and the ones we hail
    Are the worst of all, and the blood's run stale

    I wanna hide the truth, I wanna shelter you
    But with the beast inside, there's nowhere we can hide
    No matter what we breed, we still are made of greed
    This is my kingdom come, this is my kingdom come
    
    When you feel my heat, look into my eyes
    It's where my demons hide, it's where my demons hide
    Don't get too close; it's dark inside
    It's where my demons hide, it's where my demons hide
    
    At the curtain's call it's the last of all
    When the lights fade out, all the sinners crawl
    So they dug your grave and the masquerade
    Will come calling out at the mess you've made
    
    Don't wanna let you down, but I am hell-bound
    Though this is all for you, don't wanna hide the truth
    No matter what we breed, we still are made of greed
    This is my kingdom come, this is my kingdom come
    
    When you feel my heat, look into my eyes
    It's where my demons hide, it's where my demons hide
    Don't get too close; it's dark inside
    It's where my demons hide, it's where my demons hide
   
    They say it's what you make, I say it's up to fate
    It's woven in my soul, I need to let you go
    Your eyes, they shine so bright, I wanna save that light
    I can't escape this now, unless you show me how
  
    When you feel my heat, look into my eyes 
    It's where my demons hide, it's where my demons hide
    Don't get too close; it's dark inside
    It's where my demons hide, it's where my demons hide`

  let [artist, setArtist] = useState('')
  let [song, setSong] = useState('')
  let header = `Now Playing : ${artist} - ${song}`
  let more = document.getElementById('more')
  let btnCollection = document.getElementsByClassName(
    'more-button style-scope ytd-video-secondary-info-renderer'
  )
  let lessCollection = document.getElementsByClassName(
    'less-button style-scope ytd-video-secondary-info-renderer'
  )

  if (btnCollection.length > 0) {
    showMore()
  }

  chrome.runtime.onMessage.addListener(function () {
    //  console.log('updated')
    showMore()
  })
  more.addEventListener('DOMNodeInserted', showMore)
  function showMore() {
    let btn = btnCollection[0] as HTMLElement
    //  console.log(btnCollection)
    btn.click()

    setTimeout(() => {
      let rowList = document.getElementsByClassName(
        'style-scope ytd-metadata-row-renderer'
      )
      // console.log(rowList)
      for (let element of rowList) {
        let nextElement = element.nextElementSibling

        if (nextElement && element.id == 'title') {
          if ((element as HTMLElement).innerText == 'Song') {
            setSong((nextElement.children[0] as HTMLElement).innerText)
          } else if ((element as HTMLElement).innerText == 'Artist') {
            setArtist((nextElement as HTMLElement).innerText)
          }
        }
        if (song && artist) break
      }
      let lessBtn = lessCollection[0] as HTMLElement
      lessBtn.click()
    }, 0)
  }
  return (
    <div className="app-ui">
      <Subtitles></Subtitles>
      <TextBox className="song-header">
        <h2>{header}</h2>
      </TextBox>
      <TextBox className="song-lyrics">{lyrics}</TextBox>
      <Menu></Menu>
    </div>
  )
}

export { AppUI }
//export { AddSubtitles }
