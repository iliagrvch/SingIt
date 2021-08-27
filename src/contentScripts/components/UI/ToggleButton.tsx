import React, { useState, useEffect } from 'react'
import { IoMdMicrophone } from 'react-icons/io'
import { CgUnavailable } from 'react-icons/cg'
import { BsMusicNoteList } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import styled from 'styled-components'

function ToggleButton(props) {
  const [checked, setChecked] = useState(false)
  const loadingIcon = <div className="lds-dual-ring"></div>
  function getIconJsx() {
    if (props.contentStatus === 'Ready') {
      switch (props.id) {
        case 'karaoke':
          return <IoMdMicrophone />
        case 'lyrics':
          return <BsMusicNoteList />
        case 'wiki':
          return <AiFillInfoCircle />
      }
    } else if (props.contentStatus === 'Loading') return loadingIcon
    else return <CgUnavailable />
  }

  useEffect(() => {
    setChecked(false)
  }, [props.contentStatus])
  function onChecked(event) {
    props.onCheck(event.target.checked)
    setChecked(event.target.checked)
  }
  return (
    <CheckBox
      isChecked={checked}
      enabled={props.contentStatus != 'Not Available'}
    >
      <label>
        <input
          onInput={onChecked}
          id={`${props.id}-btn`}
          type="checkbox"
          hidden
        ></input>
        <span className="cb-text">{props.children}</span>
        <span className="cb-icon">{getIconJsx()}</span>
      </label>
    </CheckBox>
  )
}

export default ToggleButton

const CheckBox = styled.div`
  background-color: ${(props) =>
    props.enabled
      ? props.isChecked
        ? '#2196f3'
        : 'rgb(150, 150, 150)'
      : '#FFA2A2'};
  pointer-events: ${(props) => (props.enabled ? 'auto' : 'none')};
  color: black;
  overflow: hidden;
  display: inline-flex;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 2px;
  margin: 3px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.isChecked ? 'rgb(22,140,233)' : 'rgb(130, 130, 130)'};
  }

  &:active {
    background-color: ${(props) =>
      props.isChecked ? 'rgb(33,150,243)' : 'rgb(110, 110, 110)'};
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
