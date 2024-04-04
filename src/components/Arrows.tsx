import React, { useState } from 'react';
import "./Arrows.css";

interface Props {
    onKeyDown: (event: string) => void;
}

export const Arrows = ({ onKeyDown }: Props) => {
    const [currentArrowsPosition, setCurrentArrowsPosition] = useState({ x: window.innerWidth * 0.8, y: window.innerHeight / 2 });
    const [currentCtrlPosition, setCurrentCtrlPosition] = useState({ x: window.innerWidth * 0.1, y: window.innerHeight *0.8 });
    const [dragging, setDragging] = useState(false);
    const [isArrows, setIsArrows] = useState(true);
    let longPressTimer:NodeJS.Timeout;

    const handleTouchStart = (arrow: boolean) => {
        longPressTimer = setTimeout(() => {
            setIsArrows(arrow);
            setDragging(true);
        }, 500); 
    };

    const handleTouchMove = (event : React.TouchEvent) => {
        if (dragging) {
            const touch = event.touches[0];
            if(isArrows) {
            setCurrentArrowsPosition({ x: touch.clientX, y: touch.clientY });}
            else{
                setCurrentCtrlPosition({ x: touch.clientX, y: touch.clientY });}

            }
        }
    

    const handleTouchEnd = () => {
        clearTimeout(longPressTimer);    
        setDragging(false);
    };

    const handleClick = (key: string) => {
        onKeyDown(key); 
    };

    const arrowContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: `${currentArrowsPosition.y}px`,
        left: `${currentArrowsPosition.x}px`,
        cursor: dragging ? 'grabbing' : 'grab' 
    };

    const ctrlContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: `${currentCtrlPosition.y}px`,
        left: `${currentCtrlPosition.x}px`,
        cursor: dragging ? 'grabbing' : 'grab' 
    };

    return (
        <>        <div 
            className="arrows-container"
            onTouchStart={() => handleTouchStart(true)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={arrowContainerStyle}
        >
            <button className="arrow arrow-up" onClick={() => handleClick("ArrowUp")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-left" onClick={() => handleClick("ArrowLeft")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-right" onClick={() => handleClick("ArrowRight")}><span className="material-symbols-outlined">play_arrow</span></button>
            <button className="arrow arrow-down" onClick={() => handleClick("ArrowDown")}><span className="material-symbols-outlined">play_arrow</span></button>
        </div>
        <div className="ctrl-container"
              onTouchStart={() => handleTouchStart(false)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={ctrlContainerStyle}
        >
           CTRL
        </div>
        </>

    );
};
