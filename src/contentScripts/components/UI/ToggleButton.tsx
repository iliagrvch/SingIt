import React, { useState, useEffect } from 'react'
import { IoMdMicrophone } from 'react-icons/io'
import { CgUnavailable } from 'react-icons/cg'
import { BsMusicNoteList } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'
import styled from 'styled-components'

const ToggleButton: React.FC<{
  id: string
  contentStatus: string
  onCheck: (value: boolean) => void
}> = (props) => {
  const [checked, setChecked] = useState<boolean>(false)
  const loadingIcon = <div className="lds-dual-ring"></div>

  //* Handling side effects *//
  useEffect(() => {
    setChecked(false)
  }, [props.contentStatus])
  function onChecked(event) {
    props.onCheck(event.target.checked)
    setChecked(event.target.checked)
  }

  //* Methods *//
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

  return (
    <CheckBox
      isChecked={checked}
      isLoading={props.contentStatus === 'Loading'}
      enabled={props.contentStatus != 'Not Available'}
    >
      <label onInput={onChecked} htmlFor={`${props.id}-btn`}>
        <input id={`${props.id}-btn`} type="checkbox"></input>
        <span className="cb-text">{props.children}</span>
        <span className="cb-icon">{getIconJsx()}</span>
      </label>
    </CheckBox>
  )
}

export default ToggleButton

//* Styled components *//

export const CheckBox = styled.div`
  background-color: ${(props) =>
    props.enabled
      ? props.isChecked
        ? '#2196F3'
        : 'rgb(150, 150, 150)'
      : '#FFA2A2'};
  pointer-events: ${(props) =>
    props.enabled && !props.isLoading ? 'auto' : 'none'};
  color: black;
  overflow: hidden;
  display: inline-flex;
  height: 30px;
  max-width: 100%;
  border: none;
  outline: none;
  border-radius: 2px;
  margin: 3px;
  vertical-align: bottom;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.enabled
        ? props.isChecked
          ? '#2889D2'
          : 'rgb(140, 140, 140)'
        : '#FFA2A2'};
  }
  & input {
    opacity: 0;
  }
  & .cb-text,
  .cb-icon {
    display: inline-flex;
    align-items: center;
    color: white;
    height: 100%;
  }

  & .cb-text {
    padding: 0 12px;
    position: relative;
    bottom: 1.5px;
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
