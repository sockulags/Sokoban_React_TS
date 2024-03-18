import './Play.css';
import { levels} from "../data/levels.ts";
import {Level} from "../components/Level.tsx";

export const Play = () => {
    return (
        <div className='play-container'>
           {levels.map((x, index) =>{
            return <Level key={index} level={x.level} image={x.image}/>
           })}
        </div>
    );
}