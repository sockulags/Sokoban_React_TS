import "./modal.css"
import Logo from "../assets/sokoban-header.png";

interface IModalProps {
  title:string;
  message1: string;
  message2?: string;
  onConfirm: () => void;
}

const Modal = ({ title, message1, message2, onConfirm }: IModalProps) => {
  return (
    <>
      <div>
        <div className="modal">
          <div className="modal-header">
            <img className="modal-logo"  src={Logo} />
          </div>
          <h2>{title}</h2>
          <p>{message1}</p>
          <p>{message2}</p>
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