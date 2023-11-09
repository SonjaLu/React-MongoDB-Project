import { useState } from 'react'
import NewReview from './components/NewReview/NewReview'
import ChoseRest from './components/ChoseRest/ChoseRest'
import ChoseFav from './components/ChoseFav/ChooseFav'

import {reviewDataObject} from './data/reviewDataObject';

function App() {


  // Funktion zum Erzeugen der Sterne basierend auf der Bewertungszahl
function renderStars(rating) {
  const starIcons = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starIcons.push(<span key={i}>&#9733;</span>); // Gefüllter Stern
    } else {
      starIcons.push(<span key={i}>&#9734;</span>); // Leerstern
    }
  }

  return starIcons;
}

  return (
    <div>
      {/**  Einfach zum Testen eingefügt. 
      <Register /> 
      sergej@2023-11-08 - Einfach eine Liste der Statischen Bewertungen.
      Später in Komponente auslagern.
      */}
      <ul>

      {reviewDataObject.map((review) => (
        <li key = {review.id} >
          <p>Benutzername: {review.usermane}</p>
          <p>Restaurantname: {review.restaurantName}</p>
          <p>Kommentar: {review.comment}</p>
          <p>Sterne: {renderStars(review.rating)}</p>
        </li>

      ))}

      </ul>
    </div>
  )
}

export default App
