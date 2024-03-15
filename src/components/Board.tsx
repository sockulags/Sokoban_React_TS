import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { level1Layout, level1LayoutDark, level2 } from "../data/levels";
import "./board.css";
import Highscore from "./Highscore";


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

  const [isThemeLight, setIsThemeLight] = useState<boolean>(true);
  const [theme, setTheme] = useState(level1Layout);
  const [themeBtnTitle, setThemmBtnTitle] = useState('Change to Dark');

  const [board, setBoard] = useState<number[][]>(level2);
  const [charPos, setCharPos] = useState<Position | undefined>();
  const [boxLocations, setBoxLocations] = useState<Position[]>(getLocations(2));

  const [moves, setMove] = useState<number>(0);
  const [pushes, setPushes] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState(true);
  const [gameTime, setGameTime] = useState("");

  const [characterDirection, setCharacterDirection] = useState<"up" | "down" | "left" | "right">("down");

  const changeTheme = () => {
    if (isThemeLight){
      setTheme(level1LayoutDark);
      setThemmBtnTitle("Change to Light");
    } else {
      setTheme(level1Layout);
      setThemmBtnTitle("Change to Dark");
    }
    setIsThemeLight((prev) => !prev);
  }


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

  function updateCounter (counter:number){
    const updatedCounter = counter +1
    return updatedCounter
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
    setMove(updateCounter(moves))
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
        countHighscore(100000, moves)
      }
      if (correct === 1){
        console.log("GAME OVER")
        setGameEnded(true);
        console.log(gameEnded)
      }
    }
  };

 const handleGameEnd = (time) => {
   console.log("Spelet är klart. Tid:", time);
   setGameTime(time); 
   countHighscore(gameTime, moves)
 };

   function countHighscore(time, moves) {
    time = time/1000
     const weightTime = 1;
     const weightMoves = 1; // Can be changed if time or number of moves should have a higher weight on the highscore

     let highscore = 100000 * 1 / (weightTime * time + moves * weightMoves);
     highscore = Math.floor(highscore);
     console.log("highscore: " + highscore);
   }

  const boxMove = (y: number, x: number) => {
    const newBoard = [...board];
    newBoard[y][x] = 2;
    setPushes(updateCounter(pushes))
    setBoard(newBoard);
  };

  const getTileImage = (rowIndex: number, colIndex: number) => {
    const tile = board[rowIndex][colIndex];
    if (charPos && rowIndex === charPos.y && colIndex === charPos.x) {
      switch (characterDirection) {
        case "up":
          return theme[7];
        case "down":
          return theme[5];
        case "left":
          return theme[8];
        case "right":
          return theme[9];
        default:
          return theme[tile];
      }
    }
    if (tile === 2) {
      const isOnStorage = storageLocations.some(
        (pos) => pos.y === rowIndex && pos.x === colIndex
      );
      if (isOnStorage) {
        return theme[6];
      }
    }
    return theme[tile];
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let newY: number = 0;
    let newX: number = 0;
    let newBoxPositionX: number = 0;
    let newBoxPositionY: number = 0;
    console.log(event.key)
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
    <>
      <button
        className={`theme-btn ${isThemeLight ? "light" : " dark"}`}
        onClick={changeTheme}
      >
        {themeBtnTitle}
      </button>
      <div className="highscore-data">
        <Highscore
          moves={moves}
          pushes={pushes}
          gameEnded={gameEnded}
          onGameEnd={handleGameEnd}
          isThemeLight={isThemeLight}
        />
      </div>

      <div className="board" tabIndex={0} onKeyDown={handleKeyDown} autoFocus>
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((tile, colInd) => (
              <Tile
                key={`${rowIndex}-${colInd}`}
                getTileImage={getTileImage}
                rowIndex={rowIndex}
                colIndex={colInd}
                isThemeLight={isThemeLight}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
