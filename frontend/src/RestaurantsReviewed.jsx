import React from 'react';

const express = require('express');
const app = express();
const port = 5173;


const restaurants = [
    {
        "Name": "Berliner Schnitzelhaus",
        "Category": "deutsch",
        "Location": "Berlin",
        "Bundesland": "Berlin",
        "Pic": "./assets/brick-wall.jpg",
        "AnzahlBewertungen": 273,
        "SterneDisplay": "★★★★☆"
    },
    {
      "Name": "Münchner Biergarten",
      "Category": "deutsch",
      "Location": "München",
      "Bundesland": "Bayern",
      "Pic": "./assets/table.jpg",
      "AnzahlBewertungen": 88,
      "SterneDisplay": "★★★★☆"
    },
    {
        "Name": "Roma",
        "Category": "italienisch",
        "Location": "Hannover",
        "Bundesland": "Niedersachsen",
        "Pic": "./assets/eat.jpg",
        "AnzahlBewertungen": 474,
        "SterneDisplay": "★★★★☆"
    },
    {
      "Name": "Tapas Barcelona",
      "Category": "spanisch",
      "Location": "Hamburg",
      "Bundesland": "Hamburg",
      "Pic": "./assets/red-wine.jpg",
      "AnzahlBewertungen": 116,
      "SterneDisplay": "★★★★★"
    },
    {
      "Name": "Santos",
      "Category": "spanisch",
      "Location": "Köln",
      "Bundesland": "Nordrhein-Westfalen",
      "Pic": "./assets/urban.jpg",
      "AnzahlBewertungen": 85,
      "SterneDisplay": "★★★★★"
    },
    {
      "Name": "Sushi Samurai",
      "Category": "asiatisch",
      "Location": "Düsseldorf",
      "Bundesland": "Nordrhein-Westfalen",
      "Pic": "./assets/sushi.jpg",
      "AnzahlBewertungen": 112,
      "SterneDisplay": "★★★☆☆"
    },
    {
      "Name": "Dragon Noodles",
      "Category": "asiatisch",
      "Location": "Frankfurt",
      "Bundesland": "Hessen",
      "Pic": "./assets/dragon.jpg",
      "AnzahlBewertungen": 87,
      "SterneDisplay": "★★★★☆"
    },
    {
      "Name": "Balkan Grill",
      "Category": "balkan",
      "Location": "Stuttgart",
      "Bundesland": "Baden-Württemberg",
      "Pic": "./assets/balkan.jpg",
      "AnzahlBewertungen": 127,
      "SterneDisplay": "★★★★☆"
    },
    {
      "Name": "Adriatic Seafood",
      "Category": "balkan",
      "Location": "Leipzig",
      "Bundesland": "Sachsen",
      "Pic": "./assets/seafood.jpg",
      "AnzahlBewertungen": 67,
      "SterneDisplay": "★☆☆☆☆"
    },
    {
      "Name": "Global Tastes",
      "Category": "sonstige",
      "Location": "Nürnberg",
      "Bundesland": "Bayern",
      "Pic": "./assets/vegan.jpg",
      "AnzahlBewertungen": 140,
      "SterneDisplay": "★★★★★"
    },
    {
      "Name": "Fusion Delights",
      "Category": "sonstige",
      "Location": "Bremen",
      "Bundesland": "Bremen",
      "Pic": "./assets/barista.jpg",
      "AnzahlBewertungen": 162,
      "SterneDisplay": "★☆☆☆☆"
    }
  ]

  app.get('/restaurants', (req, res) => {
    res.json(restaurants);
  });

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });