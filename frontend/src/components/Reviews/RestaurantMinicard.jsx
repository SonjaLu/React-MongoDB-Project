import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/LoginAuthen';
import './RestaurantMinicard.css';
import RestaurantBigcard from './RestaurantBigcard';
import StarRating from '../NewReview/StarRating';

const RestaurantCard = ({ name, pic, starRating, location, category, averageRating }) => {
    const categoryClass = category.replace(/\s+/g, '-').toLowerCase();

    let imagePath;
    if (pic.startsWith('http')) {
        // Für hochgeladene Bilder aus externen Quellen
        imagePath = pic;
    } else if (pic.includes('/uploads/')) {
        // Für hochgeladene Bilder im "public/uploads"-Ordner
        imagePath = `/uploads/${pic.split('/uploads/').pop()}`;
    } else if (pic.startsWith("./src/assets")) {
        // Für statische Bilder im "public/assets"-Ordner
        imagePath = `${pic.replace('./src/assets/', '/assets/')}`;
    } else {
        // Fallback für fehlende oder ungültige Bildpfade
        imagePath = '/assets/no-image.png';
    }
    return (
        <div className={`restaurant-card ${categoryClass}`}>
            <img src={imagePath} alt={name} className="restaurant-image" />
            <div className="restaurant-info">
                <h3 className="restaurant-name">{name}</h3>
                <StarRating rating={averageRating} />
                <p className="restaurant-location">{location}</p>
            </div>
        </div>
    );
};



const RestaurantList = ({ restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleCardClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const handleClose = () => {
        setSelectedRestaurant(null);
    };

    const handleCreateReview = () => {
        navigate('/newreview');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <>
            <div>
                {selectedRestaurant ? (
                    <RestaurantBigcard restaurant={selectedRestaurant} onClose={handleClose} />

                ) : (
                    <div className="restaurant-list">
                        {restaurants.map((restaurant) => (
                            <div className="restaurant-name" onClick={() => handleCardClick(restaurant)} key={restaurant.name}>
                                <RestaurantCard
                                    name={restaurant.name}
                                    pic={restaurant.pic}
                                    starRating={restaurant.starRating}
                                    location={restaurant.location}
                                    category={restaurant.category}
                                    averageRating={restaurant.averageRating}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
export default RestaurantList;