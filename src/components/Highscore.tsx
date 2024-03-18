import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";
import "./highscore.css"

interface IHighscoreProps {
  moves: number;
  pushes: number;
  time: string;
}

const Highscore = (props: IHighscoreProps) => {
   

  return (
    <>
      <div className="highscore-data">
        <Moves moves={props.moves} />
        <Pushes pushes={props.pushes} />
        <Time time={props.time}/>
      </div>
    </>
  );
};

export default Highscore;