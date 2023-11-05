import { useState } from 'react'
import './css/App.css'
import './css/new_review.css'
import Headline from './components/Headline'
//import Login from './components/Login'
import Register from './components/Register'
import NewReview from './components/NewReview'
function App() {

  return (
    <div>
      <Headline title="Restaurant Tester"/>
      {/**  Einfach zum Testen eingefügt. 
      <Register /> 
      */}
      <NewReview />
    </div>
  )
}

export default App
