import { useContext, useEffect } from "react";
import "./time.css";

import { ScoreDataContext } from "../context/ScoreDataContext";
import Modal from "./Modal";



const Time = () => {


  const {time, setUpInterval, gameEnded, start, handleGameEnd} = useContext(ScoreDataContext)


  useEffect(() => {
    setUpInterval()
  }, [start, gameEnded, setUpInterval]);



  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>
      {gameEnded && <Modal title="Congratulations, you finnished the level" message1="Click to confirm" onConfirm={handleGameEnd}/>}
    </div>
  );
}

export default Time;

