import React from 'react'
import ReactDOM from 'react-dom'
import { AppUI } from './AppUI'

const titleNode = document.querySelector('title')
const observer = new MutationObserver(mutationHandler)
observer.observe(titleNode, {
  childList: true,
})

if (location.href.includes('youtube.com/watch')) {
  waitForElement()
}

function mutationHandler() {
  if (location.href.includes('youtube.com/watch')) {
    waitForElement()
  }
}

function waitForElement() {
  observer.disconnect()
  const identifier = setInterval(() => {
    const el = document.getElementById('primary-inner')
    if (el) {
      firstLoad()
      clearInterval(identifier)
    }
  }, 500)
}

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

function injectApp(element) {
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
    const root = document.createElement('div')
    root.id = 'extension-app-wrapper'
    element.appendChild(root)
    ReactDOM.render(<App />, root)
  }
}
