import React, { useState } from 'react'
import styled from 'styled-components'

const TextArea = styled.div`
  color: ${(props) => (props.isDark ? 'white' : 'black')} !important;
  white-space: pre-line;
  margin: 20px 0px 20px 0px;
  direction: ltr;

  & p {
    max-width: 700px;
    font-size: 12px;
  }
  & hr {
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
    margin: 5px 0px 5px 0px;
  }
`
function TextCard(props) {
  const id = `song-text-${props.id}`
  const ytHtml = document.querySelector('html')
  const [darkMode, setDarkMode] = useState(ytHtml.hasAttribute('dark'))
  const observer = new MutationObserver(mutationHandler)
  observer.observe(ytHtml, {
    attributes: true,
  })

  function mutationHandler(mutations) {
    const isDark = ytHtml.hasAttribute('dark')
    setDarkMode(isDark)
  }
  return (
    <TextArea hidden={!props.enabled} isDark={darkMode}>
      {/* <div className="text-card" id={id} hidden={!props.enabled}>  */}
      <h1>{props.children ? props.header : ''}</h1>
      <hr></hr>
      <br></br>
      <p>{props.children}</p>
      <p>{ytHtml.hasAttribute('dark')}</p>
      <br></br>
      {/* </div> */}
    </TextArea>
  )
}

export default TextCard
