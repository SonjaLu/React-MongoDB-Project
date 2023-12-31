
import React, { useRef, useState } from 'react';
import './new_review.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/LoginAuthen';
import FileUpload from './FileUpload';
import { createNewReview } from '../../util/createNewReview';

/**
 * sergej@2023-11-04 
 * Formular um die neue Bewertungen zu erstellen.
 * @returns 
 */
const NewReview = () => {
  const { user } = useAuth();

  const username = user ? user.username : '';

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [pic, setPic] = useState('');

  //TODO: Methode zum aufaddieren der bewertungen
  const [reviews, setReviews] = useState(0);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState('');

  const germanStates = [
    "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg",
    "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern",
    "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz",
    "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen", "not sure"
  ];

  const getCategoryClass = () => {
    switch (category) {
      case "italienisch": return "italian-style";
      case "deutsch": return "deutsch-style";
      case "asiatisch": return "asiatisch-style";
      case "balkan": return "balkan-style";
      case "spanisch": return "spanisch-style";
      case "sonstige": return "sonstige-style";
      default: return "";
    }
  };
  //sergej@2023-11-12 - Ref aus dem Video eingefügt.
  const formRef = useRef();
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setStarRating(Number(event.target.value));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = formRef.current;
    if (isNaN(starRating) || starRating < 1 || starRating > 5) {
      console.error("Star Rating is not valid:", starRating);
      return;
    }

    const formData = new FormData();
    formData.append("id", uuidv4());
    formData.append("name", form.name.value);
    formData.append("category", category);
    formData.append("location", form.location.value);
    formData.append("state", form.state.value);

    // Füge das Bild nur hinzu, wenn es ausgewählt wurde
    if (form.image.files[0]) {
      formData.append("pic", form.image.files[0]);
    }
    formData.append("numericStarRating", starRating);
    formData.append("description", form.review.value);
    formData.append("username", username);
    console.log("Star Rating Type:", typeof starRating, "Value:", starRating);

    createNewReview(formData, navigate);
  };

  return (
    <div className="restaurant-form">
      <h2>Create new Restaurant Review</h2>
      <hr />

      <div>
        <label className="username">User: {username}</label>
        <hr />
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Restaurant name:</label>
        <input type="text" className="name" name="name"
          required value={name} onChange={e => setName(e.target.value)} />
        <label htmlFor="category">Choose Category:</label>
        <select id="category" name="category"
          className={getCategoryClass(category)}
          value={category}
          onChange={handleCategoryChange}
          required>
          <option value="">Please select</option>
          <option value="italienisch">Italienisches Restaurant</option>
          <option value="deutsch">Deutsches Restaurant</option>
          <option value="asiatisch">Asiatisches Restaurant</option>
          <option value="balkan">Balkan Restaurant </option>
          <option value="spanisch">Spanisches Restaurant</option>
          <option value="sonstige">Sonstiges</option>
        </select>

        <label htmlFor="location">Location:</label>
        <input type="text" className="location" name="location"
          required value={location} onChange={e => setLocation(e.target.value)} />
        <label htmlFor="state">State:</label>
        <select
          id="state"
          name="state"
          value={state}
          onChange={e => setState(e.target.value)}
          required>
          <option value="">Please select</option>
          {germanStates.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
        <div className="file-upload">
          <FileUpload />
        </div>

        <label>Star rating:</label>
        <div className="rating">
          <input type="radio" className="star5" name="rating"
            value={5}
            checked={starRating === 5}
            onChange={handleRatingChange} />
          <label htmlFor="star5"></label>

          <input type="radio" className="star4" name="rating"
            value={4}
            checked={starRating === 4}
            onChange={handleRatingChange} />
          <label htmlFor="star4"></label>

          <input type="radio" className="star3" name="rating"
            value={3}
            checked={starRating === 3}
            onChange={handleRatingChange} />
          <label htmlFor="star3"></label>

          <input type="radio" className="star2" name="rating"
            value={2}
            checked={starRating === 2}
            onChange={handleRatingChange} />
          <label htmlFor="star2"></label>

          <input type="radio" className="star1" name="rating"
            value={1}
            checked={starRating === 1}
            onChange={handleRatingChange} />
          <label htmlFor="star1"></label>
        </div>

        <label htmlFor="review">Text Review:</label>
        <textarea className="review" name="review" required value={description}
          onChange={e => setDescription(e.target.value)}></textarea>
        <input type="submit" className="submit" value="Send Review" />
      </form>
    </div>
  )
}

export default NewReview;