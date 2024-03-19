import "./modal.css";
import Logo from "../assets/sokoban-header.png";
import { useContext, useState } from "react";
import { ScoreDataContext } from "../context/ScoreDataContext";



const InputModal = () => {
  const [name, setName] = useState("");
  const { saveHighscore } = useContext(ScoreDataContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setName(event.target.value);
  };

  const handleSubmit = () => {
    console.log(name)
    saveHighscore(name);
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