import { useNavigate } from 'react-router-dom';
import './Level.css';

interface LevelProps{
    level: number;
    image: string;
}


export const Level = ({level, image}: LevelProps) => {
    const nav = useNavigate();
    const handleClick = (level: number) => {
        nav("/play/" + level);
    }

    return (
        <div className='level-container' onClick={() => handleClick(level)}>
           <h3 className="level-title">Level {level}</h3>
          <img src={image}/>
        </div>
    );
}