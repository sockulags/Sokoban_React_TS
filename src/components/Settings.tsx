import { useState, useContext } from "react";
import "./Settings.css";
import { ScoreDataContext } from "../context/ScoreDataContext";
import Control from "./Control";
import Sounds from "./Sounds";

interface ISettingsProps {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const Settings = ({
  toggleAudio,
  isAudioPlaying,
  isMusicPlaying,
  toggleMusic,
}: ISettingsProps) => {
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
          <div className="btns">
            <button onClick={handleControlClick}>
              Controls<span className="material-symbols-outlined">gamepad</span>
            </button>
            <button onClick={handleSoundsClick}>
              Sounds<span className="material-symbols-outlined">volume_up</span>
            </button>
          </div>
          <button className="close-btn" onClick={toggleSettings}>X</button>
        </div>
        <div className="content">
          {showControl ? (
            <Control />
          ) : (
            <Sounds
              isAudioPlaying={isAudioPlaying}
              toggleAudio={toggleAudio}
              isMusicPlaying={isMusicPlaying}
              toggleMusic={toggleMusic}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
