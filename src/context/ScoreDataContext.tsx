import { ReactElement, createContext, useState } from "react";


interface IScoreData {
  moves: number;
  updateMovesCount: () => void;
  pushes: number;
  updatePushesCount: () => void;
  start: boolean;
  timeInNumber: number;
  time: string;
  showTimer: (ms: number) => void;
  gameEnded: boolean;
  updateGameEnded: () => void;
  gameTime: string;
  updateGameTime: (time: string) => void;
  setUpInterval: () => void;
  countHighscore: (time: number, moves: number) => void;
  handleGameEnd: () => void;
  resetData: () => void;
}

interface IScoreDataContextProps {
    children: ReactElement;
}

export const ScoreDataContext = createContext({} as IScoreData);

export function ScoreDataContextProvider ({children}: IScoreDataContextProps) {
  const [moves, setMoves] = useState<number>(0);
  const [pushes, setPushes] = useState<number>(0);
  const [start, setStart] = useState(true); //If set to false the clock will stop
  const [timeInNumber, setTimeInNumber] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [gameEnded, setGameEnded] = useState(false);
  const [gameTime, setGameTime] = useState("");
  const initTime = new Date();

  function updateConter(counter: number) {
    const updatedCounter = counter + 1;
    return updatedCounter;
  }

  function updateMovesCount() {
    setMoves(updateConter(moves));
  }

  function updatePushesCount() {
    setPushes(updateConter(pushes));
  }

  function updateGameEnded() {
    setGameEnded(true);
  }

  function updateGameTime(time: string) {
    setGameTime(time)
  }

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

  const setUpInterval = () => {
    if (!start || gameEnded) {
      return;
    }
    // Set up an interval function
    const id = setInterval(() => {
      const currentTime = timeInNumber + (new Date().getTime() - initTime.getTime()); // Calculate the current time by adding the elapsed time since initTime to timeInNumber
      setTimeInNumber(currentTime); // Update the timeInNumber state
      showTimer(currentTime); // Update the UI
    }, 1); // Interval runs every 1 millisecond
    return () => clearInterval(id);
  };

  function countHighscore(time: number, moves: number) {
    time = time / 1000;
    const weightTime = 1;
    const weightMoves = 1; // Can be changed if time or number of moves should have a higher weight on the highscore

    let highscore = (100000 * 1) / (weightTime * time + moves * weightMoves);
    highscore = Math.floor(highscore);
    console.log("highscore: " + highscore);
  }

  const handleGameEnd = () => {
    console.log("Spelet är klart. Tid:", time);
    updateGameTime(time);
    countHighscore(timeInNumber, moves);
  };

// const handleGameEnd = (time: string, count: number) => {
//     setTimeString(time);
//     const score = countHighscore(count, moves);
//     setScore(score);
//     checkHighscore(1, score);
//     setShowModal(true);
//     setGameEnded(false); // to close modal
// };

  const clearTime = () => {
    setTime("00:00:00");
    setTimeInNumber(0);
  };

  const resetData = () => {
    clearTime();
    setMoves(0);
    setPushes(0);
  };

  const values: IScoreData = {
    moves,
    updateMovesCount,
    pushes,
    updatePushesCount,
    start,
    timeInNumber,
    time,
    showTimer,
    gameEnded,
    updateGameEnded,
    gameTime,
    setUpInterval,
    countHighscore,
    updateGameTime,
    handleGameEnd,
    resetData,
  };

  return (
    <ScoreDataContext.Provider value={values}>
      {children}
    </ScoreDataContext.Provider>
  );
}