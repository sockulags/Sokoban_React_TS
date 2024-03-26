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
  const { saveHighscore } = useContext(ScoreDataContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    saveHighscore(name, audioRef, isAudioPlaying);
    setName("");
  };

  return (
    <>
      <div>
        <form className="modal" onSubmit={(e) => handleSubmit(e)}>
          <div className="modal-header">
            <img className="modal-logo" src={Logo} />
          </div>
          <h2>Enter your name:</h2>
          <input type="text" value={name} onChange={handleChange} autoFocus />
          <button className="modal-confirm">Submit</button>
        </form>
        <div className="background-blur"></div>
      </div>
    </>
  );
};

export default InputModal;