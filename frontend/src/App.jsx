import { useState } from 'react'
import './css/App.css'
import Headline from './components/Headline'
//import Login from './components/Login'
import Register from './components/Register'
function App() {

  return (
    <div>
      <Headline title="Restaurant Tester"/>
      <Register />
    </div>
  )
}

export default App
