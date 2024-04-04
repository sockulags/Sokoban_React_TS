import './Play.css';
import { levels, powerLevels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";
import { getCurrentLevel } from '../data/functions.ts';
import ModeSelector from '../components/ModeSelector.tsx';
import { useState } from 'react';
import { PlayMode } from '../interface.ts';



export const Play = () => {
    const level = getCurrentLevel();
    const [mode, setMode] = useState<PlayMode>("normal");

    const changeMode = (mode:PlayMode) => {
        setMode(mode);
    }

    const getCustomLevels = () => {
        const customLevels = localStorage.getItem('customLevels');
        if(customLevels){
           return JSON.parse(customLevels);
        } else{
            return [];
        }
    }

    const customLevels = getCustomLevels();
    return (
      <>
        <ModeSelector mode={mode} changeMode={changeMode} />
        {mode === "normal" && (
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
        {mode === "powerups" && (
          <div className="play-container">
        
            {powerLevels.map((x, index) => {
              return <Level key={index} level={index} />;
            })}
          </div>
        )}
        {mode === "custom" && (
          <div className="play-container">
        
            {customLevels.map((x, index) => {
              return <Level key={index} level={index} />;
            })}
          </div>
        )}
      </>
    );
}