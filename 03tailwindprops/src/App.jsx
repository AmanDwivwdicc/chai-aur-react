import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  

return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-2xl h-1/2 flex justify-center items-center mb-4'>Tailwind test</h1>
      <Card username="aman"/>
      <Card username="ayush"/>
    </>
)}


export default App
