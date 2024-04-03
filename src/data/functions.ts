import { levels } from "./levels";
import { IPosition } from "../interface";
import pushSound from "../sounds/push.mp3";
import pullSound from "../sounds/pull.mp3";
import successSound from "../sounds/success.mp3";
import wallHitSound from "../sounds/wallHit.mp3";
import completeSound from "../sounds/complete.mp3";
import highscoreSound from "../sounds/highscore.mp3";


export const getCorrectBoxCount = (
  positions: IPosition[],
  targets: IPosition[],
): number => {
  let count = 0;
  targets.forEach((target) => {
    if (positions.some((pos) => pos.x === target.x && pos.y === target.y)) {
      count++;
    }
  });
  return count;
};


export function getStorageLocations(level: number, tileType: number = 4) {
  return getLocations(level, tileType);
}

export function getBoxLocations(
  level: number,
  board: number[][] = [],
  tileType: number = 2
) {
  return board.length > 1
    ? getLocations(level, tileType, board)
    : getLocations(level, tileType);
}

function getLocations(level: number, tileType: number, board?: number[][]) {
  const array: IPosition[] = [];
  const boardCopy = board ? board : levels[level].board;
  boardCopy.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === tileType) {
        array.push({ y: rowIndex, x: colIndex });
      }
    });
  });
  return array;
}

export const getHighscores = (level: number) => {
  const highscoresString = localStorage.getItem(`sokoban-level${level}`); 
  if(highscoresString) {
    const highscores: { name: string; points: number; moves:number, time:string }[] = JSON.parse(highscoresString);
    return highscores;
  }
}

export const saveNewHighscore = (
  level: number,
  newName: string,
  currentScore: number,
  moves: number,
  time: string,
  audioRef: React.RefObject<HTMLAudioElement>,
  isAudioPlaying: boolean
) => {
  const highscoresString = localStorage.getItem(`sokoban-level${level}`);
  updateCompletedLevels(level);
  if (highscoresString) {
    const storedHighscores: {
      name: string;
      points: number;
      moves: number;
      time: string;
    }[] = JSON.parse(highscoresString);
    const newHighScore = {
      name: newName,
      points: currentScore,
      moves: moves,
      time: time,
    };
    storedHighscores.push(newHighScore);
    const five = storedHighscores
      .sort((a, b) => b.points - a.points)
      .slice(0, 5);
    localStorage.setItem(`sokoban-level${level}`, JSON.stringify(five));
    if (five.some((item) => item === newHighScore)) {
      playSound(audioRef, "highscore", isAudioPlaying);
    }
  } else {
    const newHighscore: {
      name: string;
      points: number;
      moves: number;
      time: string;
    }[] = [];
    newHighscore.push({
      name: newName,
      points: currentScore,
      moves: moves,
      time: time,
    });
    localStorage.setItem(`sokoban-level${level}`, JSON.stringify(newHighscore));
    playSound(audioRef, "highscore", isAudioPlaying);
  }
};

const updateCompletedLevels = (level:number)=> {
  const completedLevels = localStorage.getItem("completedLevels");
  if(completedLevels){
    const levelArr = JSON.parse(completedLevels)
    if(levelArr.includes(level)) return;    
    levelArr.push(level);
    localStorage.setItem("completedLevels", JSON.stringify(levelArr))
  } else{
    const newLevelsArr:string[] = [level.toString()]
    localStorage.setItem("completedLevels", JSON.stringify(newLevelsArr))
  }
}

export const getCurrentLevel = () => {
   const savedLevels = localStorage.getItem("completedLevels");
  if (savedLevels) {
    const parsedLevels:number[] = JSON.parse(savedLevels).map((lvl: string) => parseInt(lvl));
    const maxLevel = Math.max(...parsedLevels);
    console.log(levels)
    return maxLevel + 1 < levels.length ? maxLevel+1 : levels.length;    
  } else
  return 0;
}

export const playSound = (
  AudioRef: React.RefObject<HTMLAudioElement>,
  soundType: string,
  isAudioPlaying: boolean
) => {
  let soundFile;

  switch (soundType) {
    case "push":
      soundFile = pushSound;
      break;
    case "pull":
      soundFile = pullSound;
      break;
    case "success":
      soundFile = successSound;
      break;
    case "wallHit":
      soundFile = wallHitSound;
      break;
    case "complete":
      soundFile = completeSound;
      break;
    case "highscore":
      soundFile = highscoreSound;
      break;
    default:
      return;
  }

  if (AudioRef.current && isAudioPlaying) {
    AudioRef.current.src = soundFile;
    AudioRef.current.volume = 0.5;
    AudioRef.current.play();
  }
};