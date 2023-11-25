import React from 'react';
import useRestaurantReviews from './useRestaurantReviews'; 
import RestaurantList from './RestaurantMinicard.jsx'; 
import './Reviews.css';
import { useNavigate } from 'react-router-dom';


function Reviews() {
  const { showRestaurants, restaurants, showAllReviews } = useRestaurantReviews();
  const navigator = useNavigate();
  return (
    <div>
      <div className="containerbox" style={{ display: showRestaurants ? 'none' : 'block' }}>
        <h2>Thank you for your review</h2>
        <button className="animbtn" onClick={showAllReviews}>Show All Reviews</button>
      </div>

      <div className="containerbox" style={{ display: showRestaurants ? 'none' : 'block' }}>
        <h2>Change User Profile</h2>
        <button className="animbtn" onClick={ () => {
          navigator("/changeuser")
        }}>Change Profile</button>
      </div>

      {showRestaurants && <RestaurantList restaurants={restaurants} />} {/* RestaurantList verwenden */}
    </div>
  );
}

export default Reviews;


