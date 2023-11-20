import React from 'react';
import './RestaurantBigcard.css';
import { useNavigate } from 'react-router-dom';

const RestaurantBigcard = ({ restaurant, onClose }) => {
    const navigate = useNavigate();

    const handleCreateReview = () => {
        navigate('/newreview'); 
    };

    if (!restaurant) return null;


    return (
        <div className="res-big-card">
            <h2>{restaurant.name}</h2>
            <img className="respic" src={restaurant.pic} alt={restaurant.name} />
            <p><b> * {restaurant.category} *</b></p>
            <p><b>Location:</b> {restaurant.location}, {restaurant.state}</p>
            <p><b>Reviews:</b> {restaurant.reviews}</p>
            <p> {restaurant.starRating}</p>
            <div>
                <p><b>Comments:</b></p>
                {restaurant.descriptions.map((review, index) => (
                    <div key={index}>
                        <p><i>" {review.description} "</i> - {review.username}</p>
                    </div>
                ))}
            </div>
            <button className="longbtn" onClick={onClose}> &#8592; back</button>
            <button className="createbtn2" onClick={handleCreateReview} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Create new Review
            </button>
        </div>
    );
};

export default RestaurantBigcard;
