import React from 'react'
import ReactDOM from 'react-dom'
import Card from './components/UI/Card'
import TextBox from './components/UI/TextBox'

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

  let songName = 'Imagine Dragons - Demons'
  let header = `Now Playing : ${songName}`

  // let currentTime = document.getElementById('ytp-time-current')
  //console.log(currentTime)
  return (
    <div className="app-ui">
      <TextBox className="sng-header">
        <h2>{header}</h2>
      </TextBox>
      <TextBox className="sng-lyrics">{lyrics}</TextBox>
    </div>
  )
}

export default AppUI
