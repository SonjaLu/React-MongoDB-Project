import React from 'react';

function Reviews({ onShowAllReviews }) {  
    return (
        <div>
          
            <button onClick={onShowAllReviews}>Show All Reviews</button>
            
        </div>
    );
}


export default Reviews;
