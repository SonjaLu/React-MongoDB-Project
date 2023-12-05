import { useState } from 'react';
import { fetchRestaurants } from '../../util/fetchRestaurants';

export default function useRestaurantReviews() {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const showAllReviews = () => {
    console.log("### showAllReviews");
    fetchRestaurants('', setRestaurants, setShowRestaurants); // Abrufen aller Restaurants ohne Sortierung
  };

  const fetchSortedByState = () => {
    console.log("### fetchSortedByState");

    fetchRestaurants('state', setRestaurants, setShowRestaurants); // Abrufen und Sortieren der Restaurants nach Bundesstaat
  };

  const fetchSortedAlphabetically = () => {
    fetchRestaurants('name'); // Abrufen und Sortieren der Restaurants alphabetisch
  };

  return { showRestaurants, restaurants, showAllReviews, fetchSortedByState, fetchSortedAlphabetically };
};
