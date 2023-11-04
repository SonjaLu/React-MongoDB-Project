import { useState } from 'react'
import './css/App.css'
import Headline from './components/Headline'
import Login from './components/Login'
function App() {

  return (
    <div>
      <Headline title="Restaurant Tester"/>
      <Login />
    </div>
  )
}

export default App
