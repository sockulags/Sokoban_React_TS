import React, { useState, useEffect, useContext } from "react";
import Tile from "./Tile";

import { ScoreDataContext } from "../context/ScoreDataContext";

const deepCopy = (arr: number[][]): number[][] => {
  return arr.map((subArr) => [...subArr]);
};

import { level1Layout, level2 } from "../data/levels";
import "./board.css";
import Highscore from "./Highscore";
import Modal from "./Modal";
import { IHighscore } from "../interface";
import InputModal from "./InputModal";


interface Position {
  x: number;
  y: number;
}

const storageLocations = getLocations(4);

function getLocations(tileType: number) {
  const array: Position[] = [];
  level2.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === tileType) {
        array.push({ y: rowIndex, x: colIndex });
      }
    });
  });
  return array;
}

const getCharStartPosition = () => {
  const posY = level2.findIndex((row) => row.includes(5));
  const posX = level2[posY].findIndex((x) => x === 5);
  return { x: posX, y: posY };
};

const Board = () => {
  const [board, setBoard] = useState<number[][]>(deepCopy(level2));
  const [charPos, setCharPos] = useState<Position | undefined>();
  const [boxLocations, setBoxLocations] = useState<Position[]>(getLocations(2));

  const {
    moves,
    pushes,
    updateMovesCount,
    updatePushesCount,
    resetData,
    updateGameEnded,
    countHighscore,
  } = useContext(ScoreDataContext);

  //  const [gameTime, setGameTime] = useState("");

  // const [moves, setMove] = useState<number>(0);
  // const [pushes, setPushes] = useState<number>(0);
  // const [gameEnded, setGameEnded] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [timeString, setTimeString] = useState<string>();
  const [highscores, setHighscores] = useState<IHighscore[]>();
  const [score, setScore] = useState<number>();

  const [characterDirection, setCharacterDirection] = useState<string>("down");

  function getLocations(tileType: number) {
    const array: Position[] = [];
    board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        if (tile === tileType) {
          array.push({ y: rowIndex, x: colIndex });
        }
      });
    });
    return array;
  }

  const saveLevelProgress = (board: number[][], charPos: Position) => {
    const levelData = {
      board: board,
      charPos: charPos,
    };
    localStorage.setItem("levelProgress", JSON.stringify(levelData));
  };

  const loadLevelProgress = () => {
    const savedData = localStorage.getItem("levelProgress");
    if (savedData) {
      const { board, charPos } = JSON.parse(savedData);
      setBoard(board);
      setCharPos(charPos);
    }
  };

  useEffect(() => {
    const startPosition = getCharStartPosition();
    setCharPos(startPosition);
    loadLevelProgress();
  }, []);

  const resetLevel = () => {
    localStorage.removeItem("levelProgress");
    setBoard(deepCopy(level2));
    setCharPos(getCharStartPosition());
    setBoxLocations(getLocations(2));
    resetData();
  };

  const upDateCharPos = (y: number, x: number) => {
    const newBoard = [...board];
    const isStorageLocation = storageLocations.some(
      (pos) => pos.y == charPos!.y && pos.x == charPos!.x
    );
    newBoard[charPos!.y][charPos!.x] = isStorageLocation ? 4 : 3;
    newBoard[y][x] = 5;
    setCharPos({ y: y, x: x });

    updateMovesCount();

    setBoard(newBoard);
    setBoxLocations(getLocations(2));
    checkCompletion();
    saveLevelProgress(newBoard, { y: y, x: x });
  };

  const checkCompletion = () => {
    let correct = 0;
    for (const pos of storageLocations) {
      if (boxLocations.some((box) => box.x === pos.x && box.y === pos.y)) {
        correct++;
        console.log(
          "Boxes at store location: " + correct + "/" + storageLocations.length
        );
        countHighscore(100000, moves);
      }

      if (correct === 1) {
        console.log("GAME OVER");
        updateGameEnded();
      }
    }
  };




  const handleGameEnd = (time: string, count: number) => {
    setTimeString(time)
    const score = countHighscore(count, moves);
    setScore(score)
    checkHighscore(1, score);
    setShowModal(true);
    setGameEnded(false); // to close modal
  };


  const checkHighscore = (level: number, currentScore: number) => {
    const highscoresString = localStorage.getItem(`sokoban-level${level}`);
    if (highscoresString) {
      const highscores: { name: string; points: number }[] =
        JSON.parse(highscoresString);

      if (Array.isArray(highscores)) {
        highscores.push({ name: "", points: currentScore }); // Add the current score to the highscores array
        highscores.sort((a, b) => b.points - a.points); // Sort highscores in descending order
        const topHighscores = highscores.slice(0, 5); // Take the top five highscores

        setHighscores(topHighscores);

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
          setShowInputModal(true);
        }
      } else {
        console.error(
          "Data in localStorage is not in the correct format for highscores."
        );
      }
    } else {
      saveHighscore(1, "namn", currentScore);
      console.log("No saved highscores for level", level);
      saveFirstHighscore(1, "", currentScore);
      setShowInputModal(true);
    }
  };


  const inputModalSubmit = (name:string) => {
    setShowInputModal(false);
    saveHighscore(1, name, score!)
  }

    function saveFirstHighscore (level: number, name: string, highscore: number) {
      const newHighscore: { name: string; points: number }[] = [];
      newHighscore.push({ name, points: highscore });
      localStorage.setItem(
        `sokoban-level${level}`,
        JSON.stringify(newHighscore)
      );
      setHighscores(newHighscore);



  const saveHighscore = (level:number, name:string, highscore: number ) => {
   const highscoresString = localStorage.getItem(`sokoban-level${level}`);
    if (highscoresString) {
      const storedHighscores: { name: string; points: number }[] =
        JSON.parse(highscoresString);

      const scoreIndex = storedHighscores.findIndex(
          (score) => score.points === highscore
        );
        storedHighscores[scoreIndex].name = name; // Update the name for the score

    localStorage.setItem(
      `sokoban-level${level}`,
      JSON.stringify(storedHighscores)
    );
    setHighscores(storedHighscores)
  } else {
        console.error(
          "Data in localStorage is not in the correct format for highscores."
        );
      }

  };
  



  const handleEnd = () => {
    setShowModal(false);
    // Here we handle what happens when a level is finnished (next level, main menu?)
  };

  const boxMove = (y: number, x: number) => {
    const newBoard = [...board];
    newBoard[y][x] = 2;

    updatePushesCount();

    setBoard(newBoard);
  };

  const getTileImage = (rowIndex: number, colIndex: number) => {
    const tile = board[rowIndex][colIndex];
    if (charPos && rowIndex === charPos.y && colIndex === charPos.x) {
      switch (characterDirection) {
        case "up":
          return level1Layout[7];
        case "down":
          return level1Layout[5];
        case "left":
          return level1Layout[8];
        case "right":
          return level1Layout[9];
        default:
          return level1Layout[tile];
      }
    }
    if (tile === 2) {
      const isOnStorage = storageLocations.some(
        (pos) => pos.y === rowIndex && pos.x === colIndex
      );
      if (isOnStorage) {
        return level1Layout[6];
      }
    }
    return level1Layout[tile];
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let newY: number = 0;
    let newX: number = 0;
    let newBoxPositionX: number = 0;
    let newBoxPositionY: number = 0;

    console.log(event.key);

    if (charPos)
      switch (event.key) {
        case "ArrowUp":
          setCharacterDirection("up");
          newY = charPos.y - 1;
          newBoxPositionY = newY - 1;
          newX = charPos.x;
          newBoxPositionX = newX;
          break;
        case "ArrowDown":
          setCharacterDirection("down");
          newY = charPos.y + 1;
          newBoxPositionY = newY + 1;
          newX = charPos.x;
          newBoxPositionX = newX;
          break;
        case "ArrowLeft":
          setCharacterDirection("left");
          newY = charPos.y;
          newBoxPositionY = newY;
          newX = charPos.x - 1;
          newBoxPositionX = newX - 1;
          break;
        case "ArrowRight":
          setCharacterDirection("right");
          newY = charPos.y;
          newBoxPositionY = newY;
          newX = charPos.x + 1;
          newBoxPositionX = newX + 1;
          break;
      }

    switch (board[newY][newX]) {
      case 3:
      case 4:
        upDateCharPos(newY, newX);
        break;
      case 2:
        if (
          board[newBoxPositionY][newBoxPositionX] === 3 ||
          board[newBoxPositionY][newBoxPositionX] === 4
        ) {
          boxMove(newBoxPositionY, newBoxPositionX);
          upDateCharPos(newY, newX);
        }
        break;
    }
  };

  return (
    <>
      <button className="reset-btn" onClick={resetLevel}>
        Reset Puzzle{" "}
      </button>
      <div className="game-container">
        <div className="highscore-data">
          <Highscore />
        </div>
        {showModal && (
          <Modal
            title="Congratulations, you finnished the level"
            message1={
              "Moves: " + moves + " Pushes: " + pushes + " Time: " + timeString
            }
            message2={"Points: " + score}
            data={highscores}
            onConfirm={handleEnd}
          />
        )}

        {showInputModal && <InputModal onSubmit={inputModalSubmit} />}

        <div className="board" tabIndex={0} onKeyDown={handleKeyDown} autoFocus>
          {board.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((tile, colInd) => (
                <Tile
                  key={`${rowIndex}-${colInd}`}
                  getTileImage={getTileImage}
                  rowIndex={rowIndex}
                  colIndex={colInd}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
}
export default Board;
