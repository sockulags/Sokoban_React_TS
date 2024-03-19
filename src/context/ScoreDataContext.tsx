import { ReactElement, createContext, useState, useEffect } from "react";
import { IHighscore } from "../interface";
import { checkHighscore, saveHighscoreToLocalstorage } from "../data/functions";
import { useParams } from "react-router-dom";

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
  updateGameEnded: (level: number) => void;
  gameTime: string;
  updateGameTime: (time: string) => void;
  setUpInterval: () => void;
  countHighscore: (time: number, moves: number) => void;
  handleGameEnd: () => void;
  resetData: () => void;
  startGame: () => void;
  gameEndMessages: IGameEndProps;
  isNewHighscore: boolean;
  level: number;
}

interface IScoreDataContextProps {
  children: ReactElement;
}

interface IGameEndProps {
  title: string;
  message1: string;
  message2: string;
  data?: IHighscore[];
  onConfirm: IScoreData["handleGameEnd"];
}

export const ScoreDataContext = createContext({} as IScoreData);

export function ScoreDataContextProvider({ children }: IScoreDataContextProps) {
   const params = useParams();
   const lvl = params.id ? parseInt(params.id) : 0;
  const [level, setLevel] = useState<number>(lvl);
  const [moves, setMoves] = useState<number>(0);
  const [pushes, setPushes] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [timeInNumber, setTimeInNumber] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [gameEnded, setGameEnded] = useState(false);
  const [gameTime, setGameTime] = useState("");
  const initTime = new Date();
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [gameEndMessages, setGameEndMessages] = useState({
    title: "",
    message1: "",
    message2: "",
    data: [{ name: "", points: 0 }],
    onConfirm: () => handleGameEnd(),
  });
  const [score, setScore] = useState(0);
  const [isNewHighscore, setIsNewHighscore] = useState<boolean>(false);



  function updateConter(counter: number) {
    const updatedCounter = counter + 1;
    return updatedCounter;
  }

  function updateMovesCount() {
    setMoves(updateConter(moves));
    setScore(countHighscore(timeInNumber, moves));
  }

  function updatePushesCount() {
    setPushes(updateConter(pushes));
  }

  function updateGameEnded(level: number) {
    setGameEnded(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    const highscoreList = checkHighscore(level, score);

    setGameEndMessages({
      title: `Congratulations, you finished level ${level}`,
      message1: "Moves: " + moves + " Pushes: " + pushes + " Time: " + time,
      message2: "Points: " + score, // Update the message with the correct score
      data: highscoreList.highscoreList,
      onConfirm: () => handleGameEnd(),
    });

    console.log(highscoreList);
    if (highscoreList.showInputModal) setIsNewHighscore(true);
  }

  function updateGameTime(time: string) {
    setGameTime(time);
  }

  function startGame() {
    setStart(true);
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
    const id = setInterval(() => {
      const currentTime =
        timeInNumber + (new Date().getTime() - initTime.getTime());
      setTimeInNumber(currentTime);
      showTimer(currentTime);
    }, 1);
    setIntervalId(id);
  };

  function countHighscore(time: number, moves: number) {
    time = time / 1000;
    const weightTime = 1;
    const weightMoves = 1; // Can be changed if time or number of moves should have a higher weight on the highscore

    let highscore = (100000 * 1) / (weightTime * time + moves * weightMoves);
    highscore = Math.floor(highscore);
    return highscore;
  }

  const handleGameEnd = () => {
    console.log("Spelet är klart. Tid:", time, "Poäng: ", score);
    setIsNewHighscore(false);
    saveHighscoreToLocalstorage(0, "Test2", score);
    updateGameTime(time);
    setScore(countHighscore(timeInNumber, moves));
    resetData();
  };

  const clearTime = () => {
    setTime("00:00:00");
    setTimeInNumber(0);
  };

  const resetData = () => {
    clearTime();
    setStart(false);
    setMoves(0);
    setPushes(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (start) {
      setUpInterval();
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, gameEnded]);



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
    startGame,
    gameEndMessages,
    isNewHighscore,
    level,
  };

  return (
    <ScoreDataContext.Provider value={values}>
      {children}
    </ScoreDataContext.Provider>
  );
}
