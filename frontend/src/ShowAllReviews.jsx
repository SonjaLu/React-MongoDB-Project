import React, { useState } from 'react';
import RestaurantList from './RestaurantMinicards.jsx';
import Reviews from './Reviews.jsx'; 
import './RestaurantMinicard.css'; 

const ShowAllReviews = () => {
  
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState([]); 
 
  const showAllReviews = () => {
    fetch('http://localhost:5000/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setShowRestaurants(true);
      });
  };

  return (
    <div className="show-all-reviews">
      <h1>Restaurants</h1>
     
      <Reviews onShowAllReviews={showAllReviews} />
      {showRestaurants && <RestaurantList restaurants={restaurants} />}
    </div>
  );
};

export default ShowAllReviews;

