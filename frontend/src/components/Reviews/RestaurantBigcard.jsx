import React from 'react';
import './RestaurantBigcard.css';
const RestaurantBigcard = ({ restaurant, onClose }) => {
    if (!restaurant) return null;

    return (
        <div className="res-big-card">
            <h2>{restaurant.name}</h2>
            <img className="respic" src={restaurant.pic} alt={restaurant.name} />
            <p> * {restaurant.category} *</p>
            <p>Location: {restaurant.location}, {restaurant.state}</p>
            <p>Reviews: {restaurant.reviews}</p>
            <p> {restaurant.starRating}</p>
            <p>Comments: {restaurant.description}</p>
            <button onClick={onClose}> &#8592; back</button>
        </div>
    );
};

export default RestaurantBigcard;
