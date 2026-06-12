import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

//react control ui updation using hooks, useState is a hook which is used to manage state in functional components. It returns an array with two elements, the first element is the current state value and the second element is a function that can be used to update the state value. When the state value is updated, the component re-renders and the new state value is reflected in the UI.

function App() {

  let [counter, setCounter] = useState(0)

  const addValue = () => {
    console.log("clicked", counter)
    counter++
    setCounter(counter)
  }

  const decvalue = () => {
    console.log("clicked", counter)
    setCounter(counter - 1)
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value : {counter}</h2>

      <button 
      onClick={addValue}
      >Add value</button>

      <br />

      <button
      onClick={decvalue}
      >decrese value</button>
    </>
  )
}

export default App
