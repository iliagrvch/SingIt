import React from 'react'
import './TextBox.css'

function TextBox(props) {
  const classes = 'text-box-' + props.className
  return (
    <div className="text-box">
      <div className={classes}>{props.children}</div>
    </div>
  )
}

export default TextBox
