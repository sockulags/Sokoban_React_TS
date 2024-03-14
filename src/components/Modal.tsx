import "./modal.css"
import Logo from "../assets/sokoban-header.png";

interface IModalProps {
  title:string;
  message1: string;
  message2?: string;
  onConfirm: () => void;
  data?:[]
}

const Modal = ({ title, message1, message2, onConfirm, data }: IModalProps) => {
  return (
    <>
      <div>
        <div className="modal">
          <div className="modal-header">
            <img className="modal-logo" src={Logo} />
          </div>
          <h2>{title}</h2>
          <p>{message1}</p>
          <p>{message2}</p>
          {data && (
            <div className="highscore-list">
              <h2>Highscores</h2>
              <ol>
                {data.map((score, index) => (
                  <li key={index}>
                    <span className="highscore-name">{score.name}</span>
                    <span className="highscore-points">{score.points}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="modal-buttons">
            <button className="modal-confirm" onClick={() => onConfirm()}>
              Confirm
            </button>
          </div>
        </div>
        <div className="background-blur"></div>
      </div>
    </>
  );
};
 
export default Modal;