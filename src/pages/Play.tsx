import './Play.css';
import { levels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";
import { getCurrentLevel } from '../data/functions.ts';

export const Play = () => {
    const level = getCurrentLevel();
    return (
        <div className='play-container'>
           {levels.map((x, index) =>{
            const disabled = index >= level + 1;
            return <Level key={index} level={x.level} image={x.image} disabled={disabled}/>
           })}
        </div>
    );
}