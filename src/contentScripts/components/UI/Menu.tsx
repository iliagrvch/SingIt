import React, { Fragment } from 'react'
import './Menu.css'
import ToggleButton from './ToggleButton'
import LinkButton from './LinkButton'

function Menu(props) {
  function getChordsLink() {
    let linkInjection = `${(props.artistName as String).replace(
      ' ',
      '%20'
    )}%20${(props.songTitle as String).replace(' ', '%20')}`

    return `https://www.ultimate-guitar.com/search.php?search_type=title&value=${linkInjection}`
  }

  return (
    <Fragment>
      <ToggleButton
        id="karaoke"
        onCheck={props.substoggle}
        contentStatus={props.subsDataStatus}
      >
        Karaoke
      </ToggleButton>

      <ToggleButton
        id="lyrics"
        onCheck={props.lyricstoggle}
        contentStatus={props.lyricsDataStatus}
      >
        Lyrics
      </ToggleButton>

      <ToggleButton
        id="wiki"
        onCheck={props.wikitoggle}
        contentStatus={props.wikiDataStatus}
      >
        About
      </ToggleButton>
      <LinkButton
        url={getChordsLink()}
        contentStatus={
          props.subsDataStatus === 'Ready' ||
          props.lyricsDataStatus === 'Ready' ||
          props.wikiDataStatus === 'Ready' ||
          props.spotifyDataStatus === 'Ready'
            ? 'Ready'
            : 'Not Available'
        }
        id="chords"
      >
        Chords
      </LinkButton>

      <LinkButton
        contentStatus={props.spotifyDataStatus}
        url={props.spotifyUrl}
        id="spotify"
      >
        Open in Spotify
      </LinkButton>
    </Fragment>
  )
}

export default Menu
