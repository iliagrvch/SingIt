import React, { useState } from 'react'
import styled from 'styled-components'

const TextCard: React.FC<{ id: string; header: string; enabled: boolean }> = (
  props
) => {
  const id = `song-text-${props.id}`
  const ytHtml = document.querySelector('html')
  const [darkMode, setDarkMode] = useState<boolean>(ytHtml.hasAttribute('dark'))
  const observer = new MutationObserver(mutationHandler)
  observer.observe(ytHtml, {
    attributes: true,
  })

  //* Methods *//
  function mutationHandler(mutations) {
    const isDark = ytHtml.hasAttribute('dark')
    setDarkMode(isDark)
  }
  return (
    <TextArea hidden={!props.enabled} isDark={darkMode}>
      <h1>{props.children ? props.header : ''}</h1>
      <br></br>
      <p>{props.children}</p>
      <p>{ytHtml.hasAttribute('dark')}</p>
      <br></br>
    </TextArea>
  )
}

export default TextCard

const TextArea = styled.div`
  color: ${(props) => (props.isDark ? 'white' : 'black')} !important;
  white-space: pre-line;
  margin: 20px 0px 20px 0px;
  direction: ltr;

  & p {
    max-width: 700px;
    font-size: 12px;
    padding-bottom: 5px;
  }
  & h1 {
    border-bottom: 1px solid #333333;
  }
`
