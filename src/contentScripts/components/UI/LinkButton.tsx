import React from 'react'
import styled from 'styled-components'
import { FaGuitar, FaSpotify } from 'react-icons/fa'
import { CgUnavailable } from 'react-icons/cg'

function LinkButton(props) {
  const loadingIcon = <div className="lds-dual-ring"></div>

  function getIconJsx() {
    if (props.contentStatus === 'Ready') {
      switch (props.id) {
        case 'spotify':
          return <FaSpotify />
        case 'chords':
          return <FaGuitar />
      }
    } else if (props.contentStatus === 'Loading') return loadingIcon
    else {
      return <CgUnavailable />
    }
  }
  return (
    <Button
      as="a"
      target="_blank"
      rel="noopener noreferrer"
      href={props.url}
      enabled={props.contentStatus !== 'Not Available'}
    >
      <label>
        <input hidden></input>
        <span className="cb-text">{props.children}</span>
        <span className="cb-icon">{getIconJsx()}</span>
      </label>
    </Button>
  )
}

export default LinkButton

const Button = styled.button`
  background-color: ${(props) =>
    props.enabled ? 'rgb(150, 150, 150)' : '#FFA2A2'};
  pointer-events: ${(props) => (props.enabled ? 'auto' : 'none')};
  color: black;
  overflow: hidden;
  display: inline-flex;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 2px;
  text-decoration: none;
  font-size: 13px;
  margin: 3px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: rgb(130, 130, 130);
  }

  &:active {
    background-color: rgb(110, 110, 110);
  }
  & .cb-text,
  .cb-icon {
    display: inline-flex;
    align-items: center;
    color: white;
    height: 100%;
  }

  & .cb-text {
    padding: 0 8px;
  }

  & .cb-icon {
    padding: 0 12px;
    background-color: rgba(0, 0, 0, 0.08);
  }

  .lds-dual-ring {
    display: inline-block;
    width: 1em;
    height: 1em;
  }
  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
