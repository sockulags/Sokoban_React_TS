import './Play.css';
import { levels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";
import { getCurrentLevel } from '../data/functions.ts';
import ModeSelector from '../components/ModeSelector.tsx';
import { useState } from 'react';

export const Play = () => {
    const level = getCurrentLevel();
    const [normalMode, setMode] = useState<boolean>(true);

    const changeMode = (mode:boolean) => {
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
        <ModeSelector normalMode={normalMode} changeMode={changeMode}/>
        <div className='play-container'>
           {levels.map((x, index) =>{
            const disabled = index >= level + 1;
            return <Level key={index} level={x.level} image={x.image} disabled={disabled}/>
           })}
        </div>
        <div className='play-container'>
            Custom
           {customLevels.map((x, index) =>{
            return <Level key={index} level={index}/>
           })}
        </div>
        </>
    );
}