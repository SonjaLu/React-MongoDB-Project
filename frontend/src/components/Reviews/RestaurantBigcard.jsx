import React from 'react';
import './RestaurantBigcard.css';
import { useNavigate } from 'react-router-dom';
import StarRating from '../NewReview/StarRating';
// import 'StarRating.css';

const RestaurantBigcard = ({ restaurant, onClose }) => {
    const navigate = useNavigate();
    console.log("Restaurant Daten: ", restaurant);


    const handleCreateReview = () => {
        navigate('/newreview'); 
    };

    if (!restaurant) return null;

    return (
        <>
        <div className="details-container">
            <div className="res-big-card">
                <h2>{restaurant.name}</h2>
                <div><StarRating rating={restaurant.averageRating} /></div>
                <p><b> * {restaurant.category} *</b></p>
                <img className="respic" src={restaurant.pic} alt={restaurant.name} />
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
        <button className="longbtn" onClick={onClose}> &#8592; back</button>
        <button className="createbtn2" onClick={handleCreateReview} style={{ position: 'absolute', top: '10px', right: '10px' }}>
            Create new Review
        </button>
        </>
    );
};

export default RestaurantBigcard;


// const RestaurantBigcard = ({ restaurant, onClose }) => {
//     const navigate = useNavigate();

//     const handleCreateReview = () => {
//         navigate('/newreview'); 
//     };

//     if (!restaurant) return null;


//     return (
//         <>
//         <div className="details-container">
//             <div className="res-big-card">
//                 <h2>{restaurant.name}</h2>
//                 <div><StarRating rating={restaurant.averageRating} /></div>
//                 <p><b> * {restaurant.category} *</b></p>
//                 <img className="respic" src={restaurant.pic} alt={restaurant.name} />
//                 <p><b>Location:</b> {restaurant.location}, {restaurant.state}</p>
//                 <p><b>Reviews:</b> {restaurant.reviews.length}</p>
                
            
//             </div>
//             <div className="comments-section">
//                 <p><b>Comments:</b></p>
//                 {restaurant.descriptions.map((review, index) => (
//                     <div key={index}>
//                         <p><i>" {review.description} "</i> - {review.username}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         <button className="longbtn" onClick={onClose}> &#8592; back</button>
//         <button className="createbtn2" onClick={handleCreateReview} style={{ position: 'absolute', top: '10px', right: '10px' }}>
//             Create new Review
//         </button>
//         </>
//     );
// };

// export default RestaurantBigcard;
