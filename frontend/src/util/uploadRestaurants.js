import axios from "axios";
import { restaurants } from "../data/restaurants";


export async function  uploadRestaurants  ()  {
    fetch('http://localhost:8080/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restaurants),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }