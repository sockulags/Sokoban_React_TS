import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";

interface IHighscoreProps {
  moves: number;
  pushes: number;
  gameEnded: boolean;
  onGameEnd: (time: number) => void;
  isThemeLight: boolean;
}

const Highscore = (props: IHighscoreProps) => {
   

  return (
    <>
      <div
        className={
          props.isThemeLight ? "highscore-data light" : "highscore-data dark"
        }
      >
        <Moves moves={props.moves} />
        <Pushes pushes={props.pushes} />
        <Time gameEnded={props.gameEnded} onGameEnd={props.onGameEnd} />
      </div>
    </>
  );
};

export default Highscore;
