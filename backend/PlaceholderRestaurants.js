const fetch = require('node-fetch');

const restaurantData = [
    {
        name: "Berliner Schnitzelhaus",
        category: "deutsch",
        location: "Berlin",
        state: "Berlin",
        pic: "./src/assets/brick-wall.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 4
            },
            {
                description: "ausgezeichnete schnitzel, gemütliche Atmosphäre",
                username: "Maria234",
                numericStarRating: 4
            }
        ],
        averageRating: 4
    },
    {
        name: "Münchner Biergarten",
        category: "deutsch",
        location: "München",
        state: "Bayern",
        pic: "./src/assets/table.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 4
            },
            {
                description: "lecker Bier",
                username: "Maria234",
                numericStarRating: 4
            }
        ],
        averageRating: 4
    },
    {
        name: "Roma",
        category: "italienisch",
        location: "Hannover",
        state: "Niedersachsen",
        pic: "./src/assets/eat.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 4
            },
            {
                description: "ausgezeichnete Pasta, gemütliche Atmosphäre",
                username: "Maria234",
                numericStarRating: 4
            }
        ],
        averageRating: 4
    },
    {
        name: "Tapas Barcelona",
        category: "spanisch",
        location: "Hamburg",
        state: "Hamburg",
        pic: "./src/assets/red-wine.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 5
            },
            {
                description: "fantastico",
                username: "Maria234",
                numericStarRating: 5
            }
        ],
        averageRating: 5
    },
    {
        name: "Santos",
        category: "spanisch",
        location: "Köln",
        state: "Nordrhein-Westfalen",
        pic: "./src/assets/urban.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 5
            },
            {
                description: "sehr zu empfehlen",
                username: "Maria234",
                numericStarRating: 5
            }
        ],
        averageRating: 5
    },
    {
        name: "Sushi Samurai",
        category: "asiatisch",
        location: "Düsseldorf",
        state: "Nordrhein-Westfalen",
        pic: "./src/assets/sushi.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 3
            },
            {
                description: "Top Sushi",
                username: "Maria234",
                numericStarRating: 3
            }
        ],
        averageRating: 3
    },
    {
        name: "Dragon Noodles",
        category: "asiatisch",
        location: "Frankfurt",
        state: "Hessen",
        pic: "./src/assets/dragon.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 4
            },
            {
                description: "gutes Chop",
                username: "Maria234",
                numericStarRating: 4
            }
        ],
        averageRating: 4
    },
    {
        name: "Balkan Grill",
        category: "balkan",
        location: "Stuttgart",
        state: "Baden-Württemberg",
        pic: "./src/assets/balkan.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 4
            },
            {
                description: "Fleisch perfekt gegrillt",
                username: "Maria234",
                numericStarRating: 4
            }
        ],
        averageRating: 4
    },
    {
        name: "Adriatic Seafood",
        category: "balkan",
        location: "Leipzig",
        state: "Sachsen",
        pic: "./src/assets/seafood.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 1
            },
            {
                description: "geht gar nicht",
                username: "Maria234",
                numericStarRating: 1
            }
        ],
        averageRating: 1
    },
    {
        name: "Global Tastes",
        category: "sonstige",
        location: "Nürnberg",
        state: "Bayern",
        pic: "./src/assets/vegan.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 5
            },
            {
                description: "super",
                username: "Maria234",
                numericStarRating: 5
            }
        ],
        averageRating: 5
    },
    {
        name: "Fusion Delights",
        category: "sonstige",
        location: "Bremen",
        state: "Bremen",
        pic: "./src/assets/barista.jpg",
        reviews: [
            {
                description: "gutes Essen, nettes Personal",
                username: "Theo1",
                numericStarRating: 1
            },
            {
                description: "nie wieder",
                username: "Maria234",
                numericStarRating: 1
            }
        ],
        averageRating: 1
    }
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