import React from 'react';
import useRestaurantReviews from './useRestaurantReviews';
import RestaurantList from './RestaurantMinicard.jsx';
import './Reviews.css';
import { useNavigate } from 'react-router-dom';


function Reviews() {
  const { showRestaurants, restaurants, fetchSortedByState, fetchSortedAlphabetically, showAllReviews } = useRestaurantReviews();

  const navigator = useNavigate();
  const handleCreateReview = () => {
    navigator('/newreview');
  };

  const handleLogout = () => {
    navigator('/login')
  };

  return (

    <div>
      <div className="containerbox" style={{ display: showRestaurants ? 'none' : 'block' }}>
        <h2>Thank you for your review</h2>
        <button className="animbtn" onClick={showAllReviews}>Show All Reviews</button>
      </div>

      <div className="containerbox" style={{ display: showRestaurants ? 'none' : 'block' }}>
        <h2>Change User Profile</h2>
        <button className="animbtn" onClick={() => navigator("/changeuser")}>
          Change Profile
        </button>
      </div>

      {showRestaurants && (
        <div className="main-content">
          <div className="restaurant-list-container">
            <RestaurantList restaurants={restaurants} />
          </div>
          <div id="barBox">
            <button className="createbtn2" onClick={handleCreateReview}>
              Create new Review
            </button>
            <button className="createbtn2" onClick={fetchSortedAlphabetically}>
              Sort by Name
            </button>
            <button className="createbtn2" onClick={fetchSortedByState}>
              Sort by State
            </button>
            <button className="createbtn2">
              Search by Area
            </button>
            <button className="sidebar-button" onClick={handleLogout} style={{ backgroundColor: 'red' }}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;


