import { useNavigate } from 'react-router-dom';
import './Level.css';

interface LevelProps{
    level: number;
    image?: string;
    disabled?: boolean;
}


export const Level = ({level, image, disabled= false}: LevelProps) => {
    const nav = useNavigate();
    const powerImg = image?.includes('power_up');
    const handleClick = (level: number) => {
        if(image && !powerImg){
            nav("/play/" + level);
        } else if (image && powerImg) {
            nav("/play/custom/" + level);
        } 
        }

    return (
        <div className={`level-container ${disabled ? 'disabled' : ''}`} onClick={() => handleClick(level)}>
           <h3 className="level-title">Level {level}</h3>
          <img src={image}/>
        </div>
    );
}