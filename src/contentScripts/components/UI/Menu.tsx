import React from 'react'
import './Menu.css'

function Menu(props) {
  const classes = ' menu'
  return (
    <div className={classes}>
      <button type="button" name="karaoke-button" disabled>
        Karaoke
      </button>
      <button type="button" name="lyrics-button" disabled>
        Lyrics
      </button>
      <button type="button" name="chords-button" disabled>
        Chords
      </button>
      <button type="button" name="spotify-button" disabled>
        Open in Spotify
      </button>
    </div>
  )
}

export default Menu
