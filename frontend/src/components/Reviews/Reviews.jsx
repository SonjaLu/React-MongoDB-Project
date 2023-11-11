import React from 'react';
import useRestaurantReviews from './useRestaurantReviews'; // Pfad anpassen
import RestaurantList from './RestaurantMinicard.jsx'; // Importieren Sie RestaurantList

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
