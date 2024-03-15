import React from 'react';
import './Level.css';
import Level0 from "../assets/level_images/level_0.png";

export const Level = () => {
    return (
        <div className='level-container'>
           <h3 className="level-title">Play</h3>
          <img src={Level0}/>
        </div>
    );
}