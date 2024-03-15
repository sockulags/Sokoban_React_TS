import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { level1Layout, level2 } from "../data/levels";
import "./board.css";
import Highscore from "./Highscore";
import Modal from "./Modal";

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

const Board = () => {
  const [board, setBoard] = useState<number[][]>(level2);
  const [charPos, setCharPos] = useState<Position | undefined>();
  const [boxLocations, setBoxLocations] = useState<Position[]>(getLocations(2));

  const [moves, setMove] = useState<number>(0);
  const [pushes, setPushes] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState(false);
  //const [gameTime, setGameTime] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [timeString, setTimeString]= useState<string>()
  const [highscores, setHighscores] = useState()
  const [score, setScore] = useState<number>()

  const [characterDirection, setCharacterDirection] = useState<
    "up" | "down" | "left" | "right"
  >("down");

  const getCharStartPosition = () => {
    const posY = board.findIndex((row) => row.includes(5));
    const posX = board[posY].findIndex((x) => x === 5);
    return { x: posX, y: posY };
  };

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

  function updateCounter(counter: number) {
    const updatedCounter = counter + 1;
    return updatedCounter;
  }

  useEffect(() => {
    const startPosition = getCharStartPosition();
    setCharPos(startPosition);
  }, []);

  const upDateCharPos = (y: number, x: number) => {
    const newBoard = [...board];
    const isStorageLocation = storageLocations.some(
      (pos) => pos.y == charPos!.y && pos.x == charPos!.x
    );
    newBoard[charPos!.y][charPos!.x] = isStorageLocation ? 4 : 3;
    newBoard[y][x] = 5;
    setCharPos({ y: y, x: x });
    setMove(updateCounter(moves));
    setBoard(newBoard);
    setBoxLocations(getLocations(2));
    checkCompletion();
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
      if (correct === storageLocations.length) {
        setGameEnded(true);
      }
    }
  };

  const handleGameEnd = (time: string, count: number) => {
    //setGameTime(count);
    setTimeString(time)
    const score = countHighscore(count, moves);
    console.log(score);
    setScore(score)
    checkHighscore(1, score);
    setShowModal(true);
    setGameEnded(false); // to not display modal
    
  };

  function countHighscore(gameTime: number, moves: number) {
    const time = gameTime / 1000;
    const weightTime = 1;
    const weightMoves = 1; // Can be changed if time or number of moves should have a higher weight on the highscore

    let highscore = (100000 * 1) / (weightTime * time + moves * weightMoves);
    highscore = Math.floor(highscore);
    return highscore;
  }

  const checkHighscore = (level: number, currentScore: number) => {
    const highscoresString = localStorage.getItem(`sokoban-level${level}`);
    if (highscoresString) {
      const highscores: { name: string; points: number }[] =
        JSON.parse(highscoresString);
      console.log("Highscores for level", level, ":", highscores);

      if (Array.isArray(highscores)) {
        // Add the current score to the highscores array
        highscores.push({ name: "", points: currentScore });
        // Sort highscores in descending order
        highscores.sort((a, b) => b.points - a.points);
        // Take the top five highscores
        const topHighscores = highscores.slice(0, 5);
        // Check if the current score is one of the top five
        const scoreIndex = topHighscores.findIndex(
          (score) => score.points === currentScore
        );
        // If the current score is one of the top five, prompt the user for their name
        if (scoreIndex !== -1) {
          const playerName = prompt(
            "Congratulations! You made it to the highscore list! Enter your name:"
          );

          if (playerName) {
            // Update the name for the current score
            topHighscores[scoreIndex].name = playerName;
          }
        }

        // Save the top five highscores to localStorage
        localStorage.setItem(
          `sokoban-level${level}`,
          JSON.stringify(topHighscores)
        );
        setHighscores(topHighscores);

        // Do something with topHighscores, e.g., display them in a Highscore component
      } else {
        console.error(
          "Data in localStorage is not in the correct format for highscores."
        );
      }
    } else {
      saveHighscore(1, "namn", currentScore);
      console.log("No saved highscores for level", level);
    }
  };

 
  const saveHighscore = (level: number, name: string, highscore: number) => {
    const existingHighscoresString = localStorage.getItem(
      `sokoban-level${level}`
    );
    let existingHighscores: { name: string; points: number }[] = [];
    if (existingHighscoresString) {
      existingHighscores = JSON.parse(existingHighscoresString);
    }

    existingHighscores.push({ name, points: highscore });

    // Sort highscores in descending order
    existingHighscores.sort((a, b) => b.points - a.points);

    // Take top five
    const topHighscores = existingHighscores.slice(0, 5);

    // Save to localstorage
    localStorage.setItem(
      `sokoban-level${level}`,
      JSON.stringify(topHighscores)
    );
  };
  

  const handleEnd = () => {
    console.log("This is the end!"); 
    setShowModal(false); //to not display modal
  };

  const boxMove = (y: number, x: number) => {
    const newBoard = [...board];
    newBoard[y][x] = 2;
    setPushes(updateCounter(pushes));
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
    console.log(board[newY][newX]);
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
    <div className="game-container">
      <div className="highscore-data">
        <Highscore
          moves={moves}
          pushes={pushes}
          gameEnded={gameEnded}
          onGameEnd={handleGameEnd}
        />
      </div>
      {showModal && (
        <Modal
          title="Congratulations, you finnished the level"
          message1={"Moves: " + moves + " Pushes: " + pushes + " Time: " + timeString}
          message2={"Points: " + score}
          data={highscores}
          
          onConfirm={handleEnd}
        />
      )}

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

  );
};

export default Board;
