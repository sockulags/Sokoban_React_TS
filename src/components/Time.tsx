import { useEffect, useState } from "react";
import "./time.css";

interface ITimeProps {
  gameEnded: boolean;
  onGameEnd: (time: number) => void;
}

const Time = ({ gameEnded, onGameEnd }:ITimeProps) => {
  const [start, setStart] = useState(true); //If set to false the clock will stop
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const initTime = new Date();

  const showTimer = (ms: number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0"); // put a 0 at the start if less then two digits
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    // const hour = Math.floor(ms / 1000 / 60 / 60).toString();
    setTime(
      // hour.padStart(2, "0") +
      // ":" +
      minute + ":" + second + ":" + milliseconds
    );
  };

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  useEffect(() => {
    if (!start||gameEnded) {
      return;
    }
    // Set up an interval function
    const id = setInterval(() => {
      const time = count + (new Date() - initTime); // Calculate the current time by adding the elapsed time since initTime to count
      setCount(time); // Update the count state
      showTimer(time); // Update the UI
    }, 1); // Interval runs every 1 millisecond
    return () => clearInterval(id); // Return a cleanup function to clear the interval when the component unmounts or when 'start' changes
  }, [start, gameEnded]);

  // Function to handle game end
  const handleGameEnd = () => {
    console.log(time)
    onGameEnd(time);
    
  };

  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>
      {gameEnded && <button onClick={handleGameEnd}>Finish Game</button>}
    </div>
  );
}

export default Time;