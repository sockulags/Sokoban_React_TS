import "./modal.css"
import Logo from "../assets/sokoban-header.png";
import { useNavigate } from "react-router-dom";
import { ScoreDataContext } from "../context/ScoreDataContext";
import { useContext } from "react";
import { HighscoreProps } from "../pages/HighscorePage";

interface IModalProps {
  title: string;
  message1: string;
  message2?: string;
  onConfirm: () => void;
  data?: HighscoreProps[];
  restart: () => void;
}


const Modal = ({
  title,
  message1,
  message2,
  onConfirm,
  data,
  restart,  
}: IModalProps) => {
  const { level, setLevel, isCustomLevel } = useContext(ScoreDataContext);
  const nav = useNavigate();

  const levels = () => {
    onConfirm();
    nav("/play");
  };
  const nextLevel = () => {
    onConfirm();
    nav(`/play/${level + 1}`);
    const newLevel = level + 1;
    setLevel(newLevel);
  };
  return (
    <>
      <div>
        <div className="modal">
          <div className="modal-header">
            <img className="modal-logo" src={Logo} />
          </div>
          <h2 className="title">{title}</h2>
          <p>{message1}</p>
          <p>{message2}</p>
          {data && (
            <div className="highscore-list">
              <h2 className="highscore">Highscores</h2>
              <ol>
                {data.map((score, index) => (
                  <li key={index}>
                    <span className="highscore-name">{score.name}: </span>
                    <span className="highscore-points">{score.score}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="modal-buttons">
            <button className="modal-confirm" onClick={restart}>
              Try again
            </button>
            <button className="modal-confirm" onClick={levels}>
              Levels
            </button>
            {!isCustomLevel &&
            <button className="modal-confirm" onClick={nextLevel}>
              Next level
            </button>}
          </div>
        </div>
        <div className="background-blur"></div>
      </div>
    </>
  );
};
 
export default Modal;