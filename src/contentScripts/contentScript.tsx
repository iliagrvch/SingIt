import React from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import { AppUI } from './AppUI'

console.log('contentscript') // Check if content script loads, for debug only

///* App injection  when the page is fully loaded*///
document.body.onload = function () {
  class App extends React.Component {
    render() {
      return (
        <div>
          <AppUI></AppUI>
        </div>
      )
    }
  }

  const root = document.createElement('div')
  root.id = 'extension-app-wrapper'
  const element = document.getElementById('meta')
  element.appendChild(root)
  ReactDOM.render(<App />, document.getElementById('extension-app-wrapper'))
}
