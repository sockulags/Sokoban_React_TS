import { useContext, useEffect } from "react";
import "./time.css";

import { ScoreDataContext } from "../context/ScoreDataContext";
import Modal from "./Modal";



const Time = () => {

  /*
import Modal from "./Modal";

interface ITimeProps {
  gameEnded: boolean;
  onGameEnd: (time: string, count: number) => void;
}

const Time = ({ gameEnded, onGameEnd }:ITimeProps) => {
  const [start, setStart] = useState(true); //If set to false the clock will stop
  const [count, setCount] = useState(0);
  const [time, setTime] = useState<string>("00:00:00");

  const initTime:Date = new Date();
  */


  const {time, setUpInterval, gameEnded, start, handleGameEnd} = useContext(ScoreDataContext)


  useEffect(() => {
    setUpInterval()
  }, [start, gameEnded, setUpInterval]);


        /*
    if (!start||gameEnded) {
      return;
    }
    // Set up an interval function
    const id = setInterval(() => {
      const currentTime: number = count + (new Date().getTime() - initTime.getTime()); // Calculate the current time by adding the elapsed time since initTime to count
      setCount(currentTime); // Update the count state
      showTimer(currentTime); // Update the UI
    }, 1); // Interval runs every 1 millisecond
    return () => clearInterval(id); // Return a cleanup function to clear the interval when the component unmounts or when 'start' changes
  }, [start, gameEnded]);

  // Function to handle game end
  const handleGameEnd = () => {
    console.log(time)
    setStart(false)  //stop the time
    onGameEnd(time, count);
    
  };
        */


  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>
      {gameEnded && <Modal title="Congratulations, you finnished the level" message1="Click to confirm" onConfirm={handleGameEnd}/>}
    </div>
  );
}

export default Time;

