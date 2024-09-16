import { useState } from 'react'
import Router from './Router/Router'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router/>
    </>
  )
}

export default App
