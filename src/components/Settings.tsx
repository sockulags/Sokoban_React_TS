import { useState, useContext } from "react";
import "./Settings.css";
import { ScoreDataContext } from "../context/ScoreDataContext";
import Control from "./Control";
import Sounds from "./Sounds";

const Settings = () => {
  const { toggleSettings } = useContext(ScoreDataContext);
  const [showControl, setShowControl] = useState(true);

  const handleControlClick = () => {
    setShowControl(true);
  };

  const handleSoundsClick = () => {
    setShowControl(false);
  };

  return (
    <>
      <div className="background-blur"></div>
      <div className="settings">
        <div className="header">
          <div>
            <button onClick={handleControlClick}>Controls</button>
            <button onClick={handleSoundsClick}>Sounds</button>
          </div>
          <button className="close-btn" onClick={toggleSettings}>X</button>
        </div>
        <div className="content">{showControl ? <Control /> : <Sounds />}</div>
      </div>
    </>
  );
};

export default Settings;
