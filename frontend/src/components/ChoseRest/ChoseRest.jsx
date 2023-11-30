import React from 'react'
import './ChoseRest.css';
import { Link } from 'react-router-dom';


const ChoseRest = () => {
    return (
        <div className='ChooseYourRest'>
            <div className="ChooseYourRest-container">
                <div className="ChooseYourRest-header">
                    <div className='ChooseYourRest-img'>
                        {/* <img className="ChooseYourRestImg"src={Restaurantpng} alt="" /> */}
                    </div>
                    <div className="ChooseYourRest-text">
                        <h2>All Asian restaurants..</h2>
                        <p>Choose your restaurant and see their posts...</p>
                    </div>
                    <div className="underline"></div>
                </div>
                <div className="ChooseYourRest-main">
                    <div className="ChooseYourRest-select">
                        {/* <input type="text"  /> */}
                        <label htmlFor="Asian restaurant">Choose your restaurant:</label>
                        <select name="Asian restaurant" id="Asian">
                            <option value="Restaurant a">Restaurant a</option>
                            <option value="Restaurant b">Restaurant b</option>
                            <option value="Restaurant c">Restaurant c</option>
                            <option value="Restaurant d">Restaurant d</option>
                        </select>
                    </div>
                    <button>Check now</button>
                </div>
            </div>
        </div>
    )
}

export default ChoseRest