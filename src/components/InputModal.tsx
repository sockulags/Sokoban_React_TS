import "./modal.css";
import Logo from "../assets/sokoban-header.png";
import { useContext, useState } from "react";
import { ScoreDataContext } from "../context/ScoreDataContext";

interface IInputModalProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isAudioPlaying: boolean;
}

const InputModal = ({ audioRef, isAudioPlaying }: IInputModalProps) => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { saveHighscore } = useContext(ScoreDataContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    setName(inputName);
    setIsValid(inputName.length <= 10 && inputName.length > 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      saveHighscore(name, audioRef, isAudioPlaying);
      setName("");
    }
  };

  return (
    <>
      <div>
        <form className="modal" onSubmit={(e) => handleSubmit(e)}>
          <div className="modal-header">
            <img className="modal-logo" src={Logo} />
          </div>
          <h2>Enter your name:</h2>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            autoFocus
            maxLength={10}
            minLength={1}
            style={isValid ? {} : { borderColor: "red" }}
          />
          {!isValid && (
            <p style={{ color: "#ecc010", fontSize: "12px" }}>
              Max 10 characters
            </p>
          )}
          <button className="modal-confirm">Submit</button>
        </form>
        <div className="background-blur"></div>
      </div>
    </>
  );
};

export default InputModal;
