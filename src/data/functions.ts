import { levels } from "./levels";
import { IPosition } from "../interface";

export const getCorrectBoxCount = (
  positions: IPosition[],
  targets: IPosition[]
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
  console.log(`sokoban-level${level}`)
  const highscoresString = localStorage.getItem(`sokoban-level${level}`); 
  if(highscoresString) {
    const highscores: { name: string; points: number; moves:number, time:string }[] = JSON.parse(highscoresString);
    return highscores;
  }
}

export const saveNewHighscore = (level: number, newName: string, currentScore: number, moves:number, time:string)=> {
  const highscoresString = localStorage.getItem(`sokoban-level${level}`);
  if (highscoresString) {
    const storedHighscores: { name: string; points: number; moves: number; time:string }[] = JSON.parse(highscoresString);
      storedHighscores.push({ name: newName, points: currentScore, moves:moves, time:time }); 
      const five = storedHighscores.sort((a, b) => b.points - a.points).slice(0,5);
      localStorage.setItem(`sokoban-level${level}`, JSON.stringify(five));
  }
  else{
    const newHighscore: { name: string; points: number, moves:number, time:string }[] = [];
    newHighscore.push({ name: newName, points: currentScore, moves:moves, time:time });
    localStorage.setItem(`sokoban-level${level}`, JSON.stringify(newHighscore));
  }
}


