import React, { useState } from 'react';
import './RestaurantMinicard.css'; 
// import RestaurantCard from './RestaurantCard';
import RestaurantBigcard from './RestaurantBigcard';

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


// const RestaurantList = ({ restaurants }) => {
//     const [selectedRestaurant, setSelectedRestaurant] = useState(null);

//     const handleCardClick = (restaurant) => {
//         setSelectedRestaurant(restaurant);
//     };

//     return (
//         <div>
//             <RestaurantBigcard restaurant={selectedRestaurant} />
//             <div className="restaurant-list">
//                 {restaurants.map((restaurant) => (
//                     <div onClick={() => handleCardClick(restaurant)} key={restaurant.name}>
//                         <RestaurantCard
//                             name={restaurant.name}
//                             pic={restaurant.pic}
//                             starRating={restaurant.starRating}
//                             location={restaurant.location}
//                             category={restaurant.category}
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RestaurantList;

const RestaurantList = ({ restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const handleCardClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const handleClose = () => {
        setSelectedRestaurant(null);
    };

    return (
        <div>
            {selectedRestaurant ? (
                <RestaurantBigcard restaurant={selectedRestaurant} onClose={handleClose} />
               
            ) : (
                <div className="restaurant-list">
                    {restaurants.map((restaurant) => (
                        <div onClick={() => handleCardClick(restaurant)} key={restaurant.name}>
                            <RestaurantCard
                                name={restaurant.name}
                                pic={restaurant.pic}
                                starRating={restaurant.starRating}
                                location={restaurant.location}
                                category={restaurant.category}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default RestaurantList;