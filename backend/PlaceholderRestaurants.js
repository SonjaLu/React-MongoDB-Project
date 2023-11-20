const fetch = require('node-fetch');

const restaurantData = [ 
    {
        "name": "Berliner Schnitzelhaus",
        "category": "deutsch",
        "location": "Berlin",
        "state": "Berlin",
        "pic": "./src/assets/brick-wall.jpg",
        "reviews": 273,
        "starRating": "★★★★☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "ausgezeichnete schnitzel, gemütliche Atmosphäre",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Münchner Biergarten",
        "category": "deutsch",
        "location": "München",
        "state": "Bayern",
        "pic": "./src/assets/table.jpg",
        "reviews": 88,
        "starRating": "★★★★☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "lecker Bier",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Roma",
        "category": "italienisch",
        "location": "Hannover",
        "state": "Niedersachsen",
        "pic": "./src/assets/eat.jpg",
        "reviews": 474,
        "starRating": "★★★★☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "ausgezeichnete Pasta, gemütliche Atmosphäre",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Tapas Barcelona",
        "category": "spanisch",
        "location": "Hamburg",
        "state": "Hamburg",
        "pic": "./src/assets/red-wine.jpg",
        "reviews": 116,
        "starRating": "★★★★★",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "fantastico",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Santos",
        "category": "spanisch",
        "location": "Köln",
        "state": "Nordrhein-Westfalen",
        "pic": "./src/assets/urban.jpg",
        "reviews": 85,
        "starRating": "★★★★★",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "sehr zu empfehlen",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Sushi Samurai",
        "category": "asiatisch",
        "location": "Düsseldorf",
        "state": "Nordrhein-Westfalen",
        "pic": "./src/assets/sushi.jpg",
        "reviews": 112,
        "starRating": "★★★☆☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "Top Sushi",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Dragon Noodles",
        "category": "asiatisch",
        "location": "Frankfurt",
        "state": "Hessen",
        "pic": "./src/assets/dragon.jpg",
        "reviews": 87,
        "starRating": "★★★★☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "gutes Chop",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Balkan Grill",
        "category": "balkan",
        "location": "Stuttgart",
        "state": "Baden-Württemberg",
        "pic": "./src/assets/balkan.jpg",
        "reviews": 127,
        "starRating": "★★★★☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "Fleisch perfekt gegrillt",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Adriatic Seafood",
        "category": "balkan",
        "location": "Leipzig",
        "state": "Sachsen",
        "pic": "./src/assets/seafood.jpg",
        "reviews": 67,
        "starRating": "★☆☆☆☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "geht gar nicht",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Global Tastes",
        "category": "sonstige",
        "location": "Nürnberg",
        "state": "Bayern",
        "pic": "./src/assets/vegan.jpg",
        "reviews": 140,
        "starRating": "★★★★★",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "super",
              "username": "Maria234"
            }
            ]
    },
    {
        "name": "Fusion Delights",
        "category": "sonstige",
        "location": "Bremen",
        "state": "Bremen",
        "pic": "./src/assets/barista.jpg",
        "reviews": 162,
        "starRating": "★☆☆☆☆",
        "descriptions": [
            {
              "description": "gutes Essen, nettes Personal",
              "username": "Theo1"
            },
            {
              "description": "nie wieder",
              "username": "Maria234"
            }
            ]}
  ];

  fetch('http://localhost:8081/restaurants', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(restaurantData),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

module.exports = restaurantData;