
import { useState } from 'react';

const useRestaurantReviews = () => {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  // const showAllReviews = () => {
  //   fetch('http://localhost:8080/api/restaurants')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRestaurants(data);
  //       setShowRestaurants(true);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  const showAllReviews = () => {
    console.log('showAllReviews called');
    fetch('http://localhost:8081/api/restaurants')
      .then(response => {
        console.log('Response received');
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        setRestaurants(data);
        setShowRestaurants(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return { showRestaurants, restaurants, showAllReviews };
};

export default useRestaurantReviews;
