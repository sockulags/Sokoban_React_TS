import { ReactElement, createContext, useState, useEffect } from "react";
import { IHighscore } from "../interface";
import { getHighscores, saveNewHighscore } from "../data/functions";

import { useParams } from "react-router-dom";

type IntervalId = ReturnType<typeof setInterval>;

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
  resetLevel: () => void;
  startGame: () => void;
  gameEndMessages: IGameEndProps;
  isNewHighscore: boolean;
  level: number;
  saveHighscore: (
    name: string,
    audioRef: React.RefObject<HTMLAudioElement>,
    isAudioPlaying: boolean
  ) => void;
  setLevel: (level: number) => void;
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
  const [intervalId, setIntervalId] = useState<IntervalId | null>(null);
  const [gameEndMessages, setGameEndMessages] = useState<IGameEndProps>({
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
    // setScore(countHighscore(timeInNumber, moves));
  }

  function updatePushesCount() {
    setPushes(updateConter(pushes));
  }

  function updateGameEnded(lvl: number) {
    const newScore =  countHighscore(lvl, moves);
    setScore(newScore);
    setGameEnded(true);
    if (intervalId) {
      clearInterval(intervalId);
      //setIntervalId(null);
    }
    const highscoreList = getHighscores(level);

    setGameEndMessages({
      title: `Congratulations, you finished level ${level}`,
      message1: "Moves: " + moves + " Pushes: " + pushes + " Time: " + time,
      message2: "Points: " + newScore,
      data: highscoreList,
      onConfirm: () => handleGameEnd(),
    });
   
    if (!highscoreList || highscoreList.length < 5 || highscoreList?.some(s => s.points < newScore)) setIsNewHighscore(true);
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
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");

    setTime(minute + ":" + second + ":" + milliseconds);
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
    const weightMoves = 2;

    let highscore = (1000000 * 1) / (weightTime * time + moves * weightMoves);
    highscore = Math.floor(highscore);
     console.log(highscore);
    return highscore;
   
  }

  const handleGameEnd = () => {
    resetLevel();
    setGameEnded(false);
  };

  const saveHighscore = (
    name: string,
    audioRef: React.RefObject<HTMLAudioElement>,
    isAudioPlaying: boolean
  ) => {
    setIsNewHighscore(false);
    setGameEndMessages((prev) => ({
      ...prev,
      data: getHighscores(level),
    }));
    saveNewHighscore(level, name, score, moves, time, audioRef, isAudioPlaying);
    updateGameTime(time);
  };

  const resetLevel = () => {
    setStart(false);
    setMoves(0);
    setPushes(0);
    setTime("00:00:00");
    setTimeInNumber(0);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setGameEnded(false);
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
    resetLevel,
    startGame,
    gameEndMessages,
    isNewHighscore,
    level,
    saveHighscore,
    setLevel,
  };

  return (
    <ScoreDataContext.Provider value={values}>
      {children}
    </ScoreDataContext.Provider>
  );
}
