const restaurants = [
  {
    "name": "Berliner Schnitzelhaus",
    "category": "deutsch",
    "location": "Berlin",
    "state": "Berlin",
    "pic": "./assets/brick-wall.jpg",
    "reviews": 273,
    "starRating": "★★★★☆"
  },
  {
    "name": "Münchner Biergarten",
    "category": "deutsch",
    "location": "München",
    "state": "Bayern",
    "pic": "./assets/table.jpg",
    "reviews": 88,
    "starRating": "★★★★☆"
  },
  {
    "name": "Roma",
    "category": "italienisch",
    "location": "Hannover",
    "state": "Niedersachsen",
    "pic": "./assets/eat.jpg",
    "reviews": 474,
    "starRating": "★★★★☆"
  },
  {
    "name": "Tapas Barcelona",
    "category": "spanisch",
    "location": "Hamburg",
    "state": "Hamburg",
    "pic": "./assets/red-wine.jpg",
    "reviews": 116,
    "starRating": "★★★★★"
  },
  {
    "name": "Santos",
    "category": "spanisch",
    "location": "Köln",
    "state": "Nordrhein-Westfalen",
    "pic": "./assets/urban.jpg",
    "reviews": 85,
    "starRating": "★★★★★"
  },
  {
    "name": "Sushi Samurai",
    "category": "asiatisch",
    "location": "Düsseldorf",
    "state": "Nordrhein-Westfalen",
    "pic": "./assets/sushi.jpg",
    "reviews": 112,
    "starRating": "★★★☆☆"
  },
  {
    "name": "Dragon Noodles",
    "category": "asiatisch",
    "location": "Frankfurt",
    "state": "Hessen",
    "pic": "./assets/dragon.jpg",
    "reviews": 87,
    "starRating": "★★★★☆"
  },
  {
    "name": "Balkan Grill",
    "category": "balkan",
    "location": "Stuttgart",
    "state": "Baden-Württemberg",
    "pic": "./assets/balkan.jpg",
    "reviews": 127,
    "starRating": "★★★★☆"
  },
  {
    "name": "Adriatic Seafood",
    "category": "balkan",
    "location": "Leipzig",
    "state": "Sachsen",
    "pic": "./assets/seafood.jpg",
    "reviews": 67,
    "starRating": "★☆☆☆☆"
  },
  {
    "name": "Global Tastes",
    "category": "sonstige",
    "location": "Nürnberg",
    "state": "Bayern",
    "pic": "./assets/vegan.jpg",
    "reviews": 140,
    "starRating": "★★★★★"
  },
  {
    "name": "Fusion Delights",
    "category": "sonstige",
    "location": "Bremen",
    "state": "Bremen",
    "pic": "./assets/barista.jpg",
    "reviews": 162,
    "starRating": "★☆☆☆☆"
  }
];

const uploadRestaurants = () => {
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
};

return (
  <div>
    <button onClick={uploadRestaurants}>Upload Restaurants to Database</button>
  </div>
);


export default RestaurantsReviewed;
