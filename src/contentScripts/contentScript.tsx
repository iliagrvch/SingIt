import React from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import { AppUI } from './AppUI'
console.log('contentscript') // Check if content script loads, for debug only

function firstLoad() {
  const el = document.getElementById('primary-inner')
  if (el) {
    const context = el.children
    for (let i = 0; i < context.length; i++) {
      if (context[i].id === 'info') {
        injectApp(context[i])
      }
    }
  }
}

const identifier = setInterval(() => {
  console.log('interval')
  const el = document.getElementById('primary-inner')
  if (el) {
    firstLoad()
    clearInterval(identifier)
  }
}, 500)

function injectApp(element) {
  console.log('about to inject')
  if (!document.getElementById('extension-app-wrapper')) {
    class App extends React.Component {
      render() {
        return (
          <div>
            <AppUI></AppUI>
          </div>
        )
      }
    }
    console.log('injecting the app')
    const root = document.createElement('div')
    root.id = 'extension-app-wrapper'
    element.appendChild(root)
    ReactDOM.render(<App />, root)
  }
}
