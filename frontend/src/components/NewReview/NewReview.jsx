import React, { useRef,useState } from 'react';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './new_review.css'

/**
 * sergej@2023-11-04 
 * Formular um die neue Bewertungen zu erstellen.
 * @returns 
 */
const  NewReview = () =>{

    const [name, setName] = useState('');
    //const [category, setCategory] = useState('');
    //const [location, setLocation] = useState('');
    const [state, setState] = useState('');
    //TODO: Wegen typ für fotos nachgucken.
    const [pic, setPic] = useState('');

    //TODO: MEthode zum aufaddieren der bewertungen
    const [reviews, setReviews] = useState(0);
    const [starRating, setStarRating] = useState('');
    const [description, setDescription] = useState('');


    //sergej@2023-11-12 - Ref aus dem Video eingefügt.
    const formRef = useRef();
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault(); 
        // Registrierungslogik
        //sergej@2023-11-12 - registerlogik aus dem Video von Saqib
        console.log(" reviewtext: " + formRef.current.review.value);
    
        navigate('/reviews'); 
        const form = formRef.current;
        const formData = {
          id : uuidv4(),
          
          name: form.nr_restaurant_name.value,
          category: form.nr_restaurant_name.value,
          location: form.nr_restaurant_name.value,
          state: form.nr_restaurant_name.value,
          pic: form.nr_restaurant_name.value,
          reviews: form.nr_restaurant_name.value,
          starRating: form.nr_restaurant_name.value,
          description: form.review.value
        }
    
        const config = {
          url: "http://localhost:8081/addReview",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify(formData)
        }
    
        const resp = await axios (config);
        console.log(resp);
     
    };

    //TODO: Kategory, Restaurantname etc in html einfügen unten.
    return  (
        <div className="restaurant-form">
            <h1>Neue Restaurant Bewertung erstellen</h1>
            <hr />

            <div>
                <label className="username">Benutzername: </label>
                <hr />
            </div>

            <form ref ={formRef} onSubmit={handleSubmit}>
                <label htmlFor="nr_restaurant_name">Restaurantname:</label>
                <input type="text" className="nr_restaurant_name" name="nr_restaurant_name"
                 required  value={name} onChange={e => setName(e.target.value)} />

                <label>Bewertung:</label>
                <div className="rating">
                    <input type ="radio" className="star5" name="rating" value ={starRating} />
                    <label htmlFor="star5"></label>
                    <input type ="radio" className="star4" name="rating" value = {starRating}/>
                    <label htmlFor="star4"></label>
                    <input type ="radio" className="star3" name="rating" value = {starRating}/>
                    <label htmlFor="star3"></label>
                    <input type ="radio" className="star2" name="rating" value  = {starRating}/>
                    <label htmlFor="star2"></label>
                    <input type ="radio" className="star1" name="rating" value  = {starRating}/>
                    <label htmlFor="star1"></label>
                </div>

                <label htmlFor="review">Bewertungstext:</label>
                <textarea className="review" name ="review" required value ={description}
                
                onChange={e => setDescription(e.target.value)}></textarea>
                <input type="submit" className="submit" value="Bewertung abschicken" />
                
            </form>
      </div>
    )
}

export default NewReview;