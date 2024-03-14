import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";

interface IHighscoreProps {
  moves: number;
  pushes: number;
  gameEnded: boolean;
  onGameEnd: (time: string, count:number) => void;
}

const Highscore = (props: IHighscoreProps) => {
   

  return (
    <>
      <div className="highscore-data">
        <Moves moves={props.moves} />
        <Pushes pushes={props.pushes} />
        <Time gameEnded={props.gameEnded} onGameEnd={props.onGameEnd} />
      </div>
    </>
  );
};

export default Highscore;
