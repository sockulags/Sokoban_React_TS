import { useEffect, useState } from "react";
import "./time.css"


export default function Time() {
  const [start, setStart] = useState(true);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const initTime = new Date();   

  const showTimer = (ms:number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");  // put a 0 at the start if less then two digits
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
    if (!start) {
      return;
    }
    const id = setInterval(() => {
      const time = count + (new Date() - initTime); // compare the new date with the date fetched at start
      setCount(time);
      showTimer(time);
      if (time <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 1);
    return () => clearInterval(id);
  }, [start]);


  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>
      
    </div>
  );
}
