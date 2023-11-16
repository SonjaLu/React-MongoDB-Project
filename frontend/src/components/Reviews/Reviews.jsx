import React from 'react';
import useRestaurantReviews from './useRestaurantReviews'; 
import RestaurantList from './RestaurantMinicard.jsx'; 

function Reviews() {
  const { showRestaurants, restaurants, showAllReviews } = useRestaurantReviews();

  return (
    <div>
      <button onClick={showAllReviews}>Show All Reviews</button>
      {showRestaurants && <RestaurantList restaurants={restaurants} />} {/* RestaurantList verwenden */}
    </div>
  );
}

export default Reviews;
