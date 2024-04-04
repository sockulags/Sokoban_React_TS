import React, { useState } from 'react';
import "./Arrows.css";

interface Props {
    onKeyDown: (event: string) => void;
}

export const Arrows = ({ onKeyDown }: Props) => {
    const [currentPosition, setCurrentPosition] = useState({ x: window.innerWidth * 0.8, y: window.innerHeight / 2 });
    const [dragging, setDragging] = useState(false);
    let longPressTimer:NodeJS.Timeout;

    const handleTouchStart = () => {
        longPressTimer = setTimeout(() => {
            setDragging(true);
        }, 500); 
    };

    const handleTouchMove = (event : React.TouchEvent) => {
        if (dragging) {
            const touch = event.touches[0];
            setCurrentPosition({ x: touch.clientX, y: touch.clientY });
        }
    };

    const handleTouchEnd = () => {
        clearTimeout(longPressTimer);    
        setDragging(false);
    };

    const handleClick = (key: string) => {
        onKeyDown(key); 
    };

    const arrowContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: `${currentPosition.y}px`,
        left: `${currentPosition.x}px`,
        cursor: dragging ? 'grabbing' : 'grab' 
    };

    return (
        <div 
            className="arrows-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={arrowContainerStyle}
        >
            <button className="arrow arrow-up" onClick={() => handleClick("ArrowUp")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-left" onClick={() => handleClick("ArrowLeft")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-right" onClick={() => handleClick("ArrowRight")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-down" onClick={() => handleClick("ArrowDown")}><span className="material-symbols-outlined">play_arrow</span></button>
        </div>
    );
};
