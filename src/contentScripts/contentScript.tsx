import React from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import MainItem from './components/MainItem'

console.log('contentscript')
const test = <p id="overlay">Hello</p>

class App extends React.Component {
  render() {
    return (
      <div>
        <MainItem></MainItem>
      </div>
    )
  }
}
const root = document.createElement('div')
const element = document.getElementById('meta')
element.appendChild(root)
ReactDOM.render(<App />, element)