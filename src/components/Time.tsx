import "./time.css";

interface ITimeProps {
  time: string;
}

const Time = ({ time }:ITimeProps) => {

  return (
    <div className="clock">
      <p className="time">TIME: {time}</p>   
    </div>
  );
}

export default Time;