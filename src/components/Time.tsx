import { useEffect, useState } from "react";


export default function Time() {
  const [start, setStart] = useState(true);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");
  //const [timeSetting, setTimeSetting] = useState({ m: 0, s: 0 });

  const initTime = new Date();   

  const showTimer = (ms:number) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
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
      const left = count + (new Date() - initTime); // compare the new date with the date fetched at start
      setCount(left);
      showTimer(left);
      if (left <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 1);
    return () => clearInterval(id);
  }, [start]);


  return (
    <div className="clock">
      <h1 className="time">{time}</h1>
      
    </div>
  );
}
