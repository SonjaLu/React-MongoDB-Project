import axios from "axios";


export async function fetchRestaurants (sortType = '', setRestaurants, setShowRestaurants ) {
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
  }