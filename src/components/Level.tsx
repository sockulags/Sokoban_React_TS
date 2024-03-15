import React from 'react';
import './Level.css';

interface LevelProps{
    level: number;
    image: string;
}


export const Level = ({level, image}: LevelProps) => {
    return (
        <div className='level-container'>
           <h3 className="level-title">Level {level}</h3>
          <img src={image}/>
        </div>
    );
}