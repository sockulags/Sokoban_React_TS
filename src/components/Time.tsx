import { useContext, useEffect } from "react";
import "./time.css";
import { ScoreDataContext } from "../context/ScoreDataContext";



const Time = () => {

  const {time, setUpInterval, gameEnded, start, handleGameEnd} = useContext(ScoreDataContext)


  useEffect(() => {
    setUpInterval()
  }, [start, gameEnded, setUpInterval]);


  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>
      {gameEnded && (
        <button onClick={() => handleGameEnd((time))}>Finish Game</button>
      )}
    </div>
  );
}

export default Time;