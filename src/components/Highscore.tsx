import { useNavigate } from "react-router-dom";
import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";
import "./highscore.css";

interface IHighscoreProps {
  moves: number;
  pushes: number;
  time: string;
  restartLevel: () => void;
  level: number;
  toggleAudio: () => void;
  isAudioPlaying: boolean;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const Highscore = (props: IHighscoreProps) => {
  const nav = useNavigate();

  const handleGoBack = () => {
    nav("/play/");
  };


  return (
    <>
      <div className="highscore-data">

        <button className="audio-btn" onClick={props.toggleAudio}>
          {props.isAudioPlaying ? (
            <span className="material-symbols-outlined">volume_up</span>
          ) : (
            <span className="material-symbols-outlined">volume_off</span>
          )}
</button>
        <button className="level-btn" onClick={handleGoBack}>
          Levels

        </button>
        <button className="reset-btn" onClick={props.restartLevel}>
          Reset Level
        </button>

        <span id="level">LEVEL: {props.level}</span>

        <Moves moves={props.moves} />
        <Pushes pushes={props.pushes} />
        <Time time={props.time} />
      </div>
    </>
  );
};

export default Highscore;
