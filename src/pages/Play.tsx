import './Play.css';
import { levels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";
import { ScoreDataContext } from '../context/ScoreDataContext.tsx';
import { useContext } from 'react';

export const Play = () => {
    const { level } = useContext(ScoreDataContext);
    return (
        <div className='play-container'>
           {levels.map((x, index) =>{
            const disabled = index >= level + 1;
            return <Level key={index} level={x.level} image={x.image} disabled={disabled}/>
           })}
        </div>
    );
}