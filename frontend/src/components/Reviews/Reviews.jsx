import React from 'react';
import useRestaurantReviews from './useRestaurantReviews'; 
import RestaurantList from './RestaurantMinicard.jsx'; 
import './Reviews.css';


function Reviews() {
  const { showRestaurants, restaurants, showAllReviews } = useRestaurantReviews();

  return (
    <div>
      <div className="containerbox" style={{ display: showRestaurants ? 'none' : 'block' }}>
        <h2>Thank you for your review</h2>
        <button className="animatedbtn" onClick={showAllReviews}>Show All Reviews</button>
      </div>
      {showRestaurants && <RestaurantList restaurants={restaurants} />} {/* RestaurantList verwenden */}
    </div>
  );
}

export default Reviews;


