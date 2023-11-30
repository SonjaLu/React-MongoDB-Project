import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => <span key={i}>&#9733;</span>)}
      {halfStar ? <span>&#189;</span> : null}
      {[...Array(emptyStars)].map((_, i) => <span key={i}>&#9734;</span>)}
    </div>
  );
};

export default StarRating;