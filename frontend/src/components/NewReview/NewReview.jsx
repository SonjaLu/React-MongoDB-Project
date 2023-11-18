import './new_review.css'
import React, { useRef, useState } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

/**
 * sergej@2023-11-04 
 * Formular um die neue Bewertungen zu erstellen.
 * @returns 
 */
const NewReview = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  //TODO: Wegen typ für fotos nachgucken.
  const [pic, setPic] = useState('');

  //TODO: MEthode zum aufaddieren der bewertungen
  const [reviews, setReviews] = useState(0);
  const [starRating, setStarRating] = useState('');
  const [description, setDescription] = useState('');


  //sergej@2023-11-12 - Ref aus dem Video eingefügt.
  const formRef = useRef();


  const handleRatingChange = (event) => {
    setStarRating(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(" reviewtext: " + formRef.current.review.value);


    const form = formRef.current;

    const formData = new FormData();
    formData.append("id", uuidv4());
    formData.append("name", form.name.value);
    formData.append("category", category);
    formData.append("location", form.location.value);
    formData.append("state", form.state.value);
    formData.append("pic", form.image.files[0]);
    formData.append("reviews", "80");
    formData.append("starRating", starRating);
    formData.append("description", form.review.value);

    /*
    sergej@2023-11-18 - Auskommentiert da FormData verwendet wird.
    es geht auch mit Objekt wie unten 

    const formData = {

      id: uuidv4(),

      name: form.name.value,
      category: category,
      location: form.location.value,
      state: form.state.value,
      pic: "/einfach test",
      reviews: 80,
      starRating: starRating,
      description: form.review.value
    }
    */
    console.log(formData);


    try{
    const config = {
      url: "http://localhost:8081/addReview",
      method: "POST",
      headers: {
        //"Content-Type": "application/json"
        "Content-Type": "multipart/form-data"

      },
      //data: JSON.stringify(formData)
      data: formData
    }

    const resp = await axios(config);
    console.log("### " + resp);
   } catch (error){
    console.error(error);
   }
  };

  //TODO: Kategory, Restaurantname etc in html einfügen unten.
  return (
    <div className="restaurant-form">
      <h1>Neue Restaurant Bewertung erstellen</h1>
      <hr />

      <div>
        <label className="username">Benutzername: </label>
        <hr />
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name">Restaurantname:</label>
        <input type="text" className="name" name="name"
          required value={name} onChange={e => setName(e.target.value)} />

        <label htmlFor="category">Kategorie auswählen:</label>
        <select id="category" name="category"
          value={category}
          onChange={handleCategoryChange}>
          <option value="italian">Italienischer Restaurant</option>
          <option value="american">Amerikanischer Restaurant</option>
          <option value="chinese">Chinesisches Restaurant</option>
          <option value="indian">Indisches Restaurant </option>
          <option value="japanese">Japanisches Restaurant</option>
        </select>

        <label htmlFor="location">Ort:</label>
        <input type="text" className="location" name="location"
          required value={location} onChange={e => setLocation(e.target.value)} />


        <label htmlFor="state">Staat:</label>
        <input type="text" className="state" name="state"
          required value={state} onChange={e => setState(e.target.value)} />

        <div>
          <input
            className="image"
            type="file"
            accept="image/*"
            name="image" />
          <button>Fotos hochladen</button>
        </div>

        <label>Bewertung:</label>
        <div className="rating">
          <input type="radio" className="star5" name="rating"
            value="5"
            checked={starRating === '5'}
            onChange={handleRatingChange} />
          <label htmlFor="star5"></label>

          <input type="radio" className="star4" name="rating"
            value="4"
            checked={starRating === '4'}
            onChange={handleRatingChange} />
          <label htmlFor="star4"></label>

          <input type="radio" className="star3" name="rating"
            value="3"
            checked={starRating === '3'}
            onChange={handleRatingChange} />
          <label htmlFor="star3"></label>

          <input type="radio" className="star2" name="rating"
            value="2"
            checked={starRating === '2'}
            onChange={handleRatingChange} />
          <label htmlFor="star2"></label>

          <input type="radio" className="star1" name="rating"
            value="1"
            checked={starRating === '1'}
            onChange={handleRatingChange} />
          <label htmlFor="star1"></label>
        </div>

        <label htmlFor="review">Bewertungstext:</label>
        <textarea className="review" name="review" required value={description}
          onChange={e => setDescription(e.target.value)}></textarea>

        <input type="submit" className="submit" value="Bewertung abschicken" />

      </form>
    </div>
  )
}

export default NewReview;