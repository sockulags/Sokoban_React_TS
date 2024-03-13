import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { level1, level1Layout } from "../data/levels";
import "./board.css";
import Highscore from "./Highscore";


interface Position {
  x: number;
  y: number;
}

const storageLocations = getLocations(4);

function getLocations(tileType: number) {
  const array: Position[] = [];
  level1.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      if (tile === tileType) {
        array.push({ y: rowIndex, x: colIndex });
      }
    });
  });
  return array;
}

const Board = () => {
  const [board, setBoard] = useState<number[][]>(level1);
  const [charPos, setCharPos] = useState<Position | undefined>();
  const [boxLocations, setBoxLocations] = useState<Position[]>(getLocations(2));
  const [moves, setMove] = useState<number>(0);
  const [pushes, setPushes] = useState<number>(0);

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
      }
    }
  };

  const boxMove = (y: number, x: number) => {
    const newBoard = [...board];
    newBoard[y][x] = 2;
    setPushes(updateCounter(pushes))
    setBoard(newBoard);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let newY: number = 0;
    let newX: number = 0;
    let newBoxPositionX: number = 0;
    let newBoxPositionY: number = 0;
    if (charPos)
      switch (event.key) {
        case "ArrowUp":
          newY = charPos.y - 1;
          newBoxPositionY = newY - 1;
          newX = charPos.x;
          newBoxPositionX = newX;
          break;
        case "ArrowDown":
          newY = charPos.y + 1;
          newBoxPositionY = newY + 1;
          newX = charPos.x;
          newBoxPositionX = newX;
          break;
        case "ArrowLeft":
          newY = charPos.y;
          newBoxPositionY = newY;
          newX = charPos.x - 1;
          newBoxPositionX = newX - 1;
          break;
        case "ArrowRight":
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
    <div className="highscore-data">
      <Highscore moves={moves} pushes={pushes}/>
    </div>
    <div className="board" tabIndex={0} onKeyDown={handleKeyDown} autoFocus>
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((tile, colInd) => (
            <Tile key={`${rowIndex}-${colInd}`} image={level1Layout[tile]} />
          ))}
        </div>
      ))}
    </div>
    </>

  );
};

export default Board;
