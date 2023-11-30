import { useState } from 'react';

export default function useRestaurantReviews() {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [restaurants, setRestaurants] = useState([]);


  const fetchRestaurants = async (sortType = '') => {
    let url = 'http://localhost:8081/api/restaurants';
    if (sortType) {
      url += `?sortBy=${sortType}`; // Fügt den Sortierparameter zur URL hinzu
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRestaurants(data);
      setShowRestaurants(true);
    } catch (error) {
      console.error('Fehler beim Abrufen der Restaurants:', error);
    }
  };

  const showAllReviews = () => {
    fetchRestaurants(); // Abrufen aller Restaurants ohne Sortierung
  };

  const fetchSortedByState = () => {
    fetchRestaurants('state'); // Abrufen und Sortieren der Restaurants nach Bundesstaat
  };

  const fetchSortedAlphabetically = () => {
    fetchRestaurants('name'); // Abrufen und Sortieren der Restaurants alphabetisch
  };

  return { showRestaurants, restaurants, showAllReviews, fetchSortedByState, fetchSortedAlphabetically };
};
