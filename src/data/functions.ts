import { levels } from "./levels";
import { IPosition, IHighscore } from "../interface";

interface IHighScoreObject {
  highscoreList: IHighscore[];
  showInputModal: boolean;
}

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

export const checkHighscore = (level: number, currentScore: number) => {
  const highscoresString = localStorage.getItem(`sokoban-level${level}`);
  const highScoreObject: IHighScoreObject = {
    highscoreList: [],
    showInputModal: false,
  };

  if (!highscoresString) {
    console.log("No saved highscores for level", level);
    highScoreObject.highscoreList = saveFirstHighscore(0, "", currentScore);
   highScoreObject.showInputModal = true;
    return highScoreObject;
  }

  const highscores: { name: string; points: number }[] =
    JSON.parse(highscoresString);

  if (Array.isArray(highscores)) {
    highscores.push({ name: "", points: currentScore }); // Add the current score to the highscores array
    highscores.sort((a, b) => b.points - a.points); // Sort highscores in descending order
    const topHighscores = highscores.slice(0, 5); // Take the top five highscores

    highScoreObject.highscoreList = topHighscores;

    // Check if the current score is one of the top five
    const scoreIndex = topHighscores.findIndex(
      (score) => score.points === currentScore
    );
    // If the current score is one of the top five, ask the user for their name
    if (scoreIndex !== -1) {
      localStorage.setItem(
        `sokoban-level${level}`,
        JSON.stringify(topHighscores)
      );
      highScoreObject.showInputModal = true;
    }
  } else {
    console.error(
      "Data in localStorage is not in the correct format for highscores."
    );
  }
  return highScoreObject;
};

export function saveFirstHighscore(
  level: number,
  name: string,
  highscore: number
) {
  const newHighscore: { name: string; points: number }[] = [];
  newHighscore.push({ name, points: highscore });
  localStorage.setItem(`sokoban-level${level}`, JSON.stringify(newHighscore));
  return newHighscore;
}

export const saveHighscoreToLocalstorage = (
  level: number,
  name: string,
  highscore: number
) => {
  const highscoresString = localStorage.getItem(`sokoban-level${level}`);
  if (highscoresString) {
    const storedHighscores: { name: string; points: number }[] =
      JSON.parse(highscoresString);

    const scoreIndex = storedHighscores.findIndex(
      (score) => score.points === highscore
    );

    if (scoreIndex !== -1) { // Check if scoreIndex is valid
      storedHighscores[scoreIndex].name = name; // Update the name for the score
      
      localStorage.setItem(
        `sokoban-level${level}`,
        JSON.stringify(storedHighscores)
      );
      return storedHighscores;
    } else {
      console.error("Score with the specified points not found.");
      return storedHighscores;
    }
  } else {
    saveFirstHighscore(level, name, highscore);
  }
};

