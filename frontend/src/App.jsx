import { useState } from 'react'
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleReviewsClick = () => {
    setShowReviews(true);
  };

  return (
    <>

    </>
  )
}

export default App
