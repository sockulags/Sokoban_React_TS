import './Play.css';
import { levels, powerLevels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";
import { getCurrentLevel } from '../data/functions.ts';
import ModeSelector from '../components/ModeSelector.tsx';
import { useState,useEffect } from 'react';
import { PlayMode } from '../interface.ts';
import { useNavigate, useParams } from 'react-router-dom';



export const Play = () => {
    const level = getCurrentLevel();
    const { mode } = useParams();
    const [playMode, setPlayMode] = useState<PlayMode>(() => {
        if (mode === "normal" || mode === "powerups" || mode === "custom") {
            return mode;
        } else {
            return "normal";
        }
    });
 
    const changeMode = (newMode:PlayMode) => {
        setPlayMode(newMode);
    }

    
    const nav = useNavigate();
    useEffect(() => {
        if(mode){
            nav(`/levels/${mode}`); 
        } else {
            nav(`/levels/${playMode}`);
        }
    }, [playMode, mode, nav])



    const getCustomLevels = () => {
        const customLevels = localStorage.getItem('customLevels');
        if(customLevels){
           return JSON.parse(customLevels);
        } else{
            return [];
        }
    }
   

    const createLevelClick = () => {
        nav("/create-level")
    }


    const customLevels = getCustomLevels();
    return (
      <>
        <ModeSelector mode={playMode} changeMode={changeMode} />
        {playMode === "normal" && (
          <div className="play-container">
            {levels.map((x, index) => {
              const disabled = index >= level + 1;
              return (
                <Level
                  key={index}
                  level={x.level}
                  image={x.image}
                  disabled={disabled}
                />
              );
            })}
          </div>
        )}
        {playMode === "powerups" && (
          <div className="play-container">
        
            {powerLevels.map((x, index) => {
              return <Level key={index} level={index} />;
            })}
          </div>
        )}
        {playMode === "custom" && (
            <>
          
          <div className="play-container">
        
            {customLevels.length === 0 ? <p>You haven't created any levels yet. Create your first to play.</p> : customLevels.map((x:number[][], index:number) => {
              return <Level key={index} level={index} />;
            })}
          </div>
          <button className="create-level-btn" onClick={createLevelClick}><span>+</span> Create Level</button>
          </>
        )}
      </>
    );
}