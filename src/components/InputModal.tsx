import "./modal.css";
import Logo from "../assets/sokoban-header.png";
import { useState } from "react";


interface IInputModalProps {
  onSubmit: (name:string) => void;
}

const InputModal = ({ onSubmit }: IInputModalProps) => {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(name)
    onSubmit(name);
    setName(""); // Reset the input field after submission
  };

  return (
    <>
      <div>
        <div className="modal">
          <div className="modal-header">
            <img className="modal-logo" src={Logo} />
          </div>
          <h2>Enter your name:</h2>
          <input type="text" value={name} onChange={handleChange} />
          <button className="modal-confirm" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="background-blur"></div>
      </div>
    </>
  );
};

export default InputModal;
