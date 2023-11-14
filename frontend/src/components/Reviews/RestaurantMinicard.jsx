import React from 'react';
import './RestaurantMinicard.css'; 

const RestaurantCard = ({ name, pic, starRating, location, category }) => {
    const categoryClass = category.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className={`restaurant-card ${categoryClass}`}>
            <img src={pic} alt={name} className="restaurant-image"/>
            <div className="restaurant-info">
                <h3 className="restaurant-name">{name}</h3>
                <p className="restaurant-stars">{starRating}</p>
                <p className="restaurant-location">{location}</p>
            </div>
        </div>
    );
};

const RestaurantList = ({ restaurants }) => {
    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <RestaurantCard
                    key={restaurant.name}
                    name={restaurant.name}
                    pic={restaurant.pic}
                    starRating={restaurant.starRating}
                    location={restaurant.location}
                    category={restaurant.category}
                />
            ))}
        </div>
    );
};

export default RestaurantList;