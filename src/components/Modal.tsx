import "./modal.css"

interface IModalProps {
  message1: string;
  message2?: string
  onConfirm: () => void;
}

const Modal = ({ message1, message2, onConfirm }: IModalProps) => {
  return (
    <>
      <div>
        <div className="modal">
          <h2>Congratulations, you finnished the level</h2>
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