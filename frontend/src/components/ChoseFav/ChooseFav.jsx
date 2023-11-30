import React from 'react'
import './ChooseFav.css';
import { Link } from 'react-router-dom';

const ChooseFav = () => {

   return (
      <div className='chooseFav'>
         <div className="chooseFav-container">
            <div className='chooseFav-header'>
               <div className="chooseFav-text">
                  <h2>What is your favorite restaurant?</h2>
                  <p>Check Feed button to choose your favourite... </p>
               </div>
               <div className="underline"></div>
            </div>


            <div className='ChooseRestmain'>
               <div className='ChooseInput'>
                  <input type="text" placeholder='Asian restaurant' />
                  <button>Check Feed</button>
               </div>
               <div className='ChooseInput'>
                  <input type="text" placeholder='German restaurant' />
                  <button>Check Feed</button>
               </div>
               <div className='ChooseInput'>
                  <input type="text" placeholder='Greece restaurant' />
                  <button>Check Feed</button>
               </div>
               <div className='ChooseInput'>
                  <input type="text" placeholder='Italian restaurant' />
                  <button>Check Feed</button>
               </div>
               <div className='ChooseInput'>
                  <input type="text" placeholder='Spain restaurant' />
                  <button>Check Feed</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ChooseFav