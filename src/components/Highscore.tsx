import { useState } from "react";
import Moves from "./Moves";
import Pushes from "./Pushes";
import Time from "./Time";

interface IHighscoreProps {
  moves: number;
  pushes: number;
}

const Highscore = (props: IHighscoreProps) => {
   

  function countHighscore(time, moves) {
    const weightTime = 1;
    const weightMoves = 2; // Can be changed if time or number of moves should have a higher weight on the highscore

    const highscore = (1 / (weightTime * time + moves * weightMoves)) * 1000;
    console.log(highscore);
  }
  return (
    <>
      <div className="highscore-data">
        <Moves moves={props.moves} />
        <Pushes pushes={props.pushes} />
        <Time />
      </div>
    </>
  );
};

export default Highscore;
