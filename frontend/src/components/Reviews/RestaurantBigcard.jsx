import React from 'react';
import './RestaurantBigcard.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../NewReview/StarRating';

const RestaurantBigcard = ({ restaurant, onClose }) => {
    const navigate = useNavigate();

    const handleCreateReview = () => {
        navigate('/newreview'); 
    };

    if (!restaurant) return null;

    const getImagePath = (pic) => {
        if (pic.startsWith('http')) {
            return pic;
        } else if (pic.includes('/uploads/')) {
            return `/uploads/${pic.split('/uploads/').pop()}`;
        } else if (pic.startsWith("./src/assets")) {
            return `${pic.replace('./src/assets/', '/assets/')}`;
        } else {
            return '/assets/no-image.png'; 
        }
    };

    const imageSrc = getImagePath(restaurant.pic);


    return (
        <>
            <div className="details-container">
                <div className="res-big-card">
                    <h2>{restaurant.name}</h2>
                    <div><StarRating rating={restaurant.averageRating} /></div>
                    <p><b> * {restaurant.category} *</b></p>
                    <img className="respic" src={imageSrc} alt={restaurant.name} />
                    <p><b>Location:</b> {restaurant.location}, {restaurant.state}</p>
                    <p><b>Reviews:</b> {restaurant.reviews.length}</p>
                </div>
                <div className="comments-section">
                    <p><b>Comments:</b></p>
                    {restaurant.reviews.map((review, index) => (
                        <div key={index}>
                            <p><i>" {review.description} "</i> - {review.username}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="longbtn" onClick={onClose}>&#8592; back </button>
            <button className="createbtn2" onClick={handleCreateReview} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                Create new Review
            </button>
        </>
    );
};

export default RestaurantBigcard;
