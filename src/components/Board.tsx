/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import Tile from "./Tile";
import {
  sandLayout,
  levels,
  characterImages,
} from "../data/levels";
import "./board.css";
import { ScoreDataContext } from "../context/ScoreDataContext";
import { IPosition, ICharDirection, Direction } from "../interface";
import {
  getBoxLocations,
  getStorageLocations,
  getCorrectBoxCount,
} from "../data/functions";
import Highscore from "./Highscore";
import Modal from "./Modal";
import InputModal from "./InputModal";
import { Arrows } from "./Arrows";


const deepCopy = (arr: number[][]): number[][] => {
  return arr.map((subArr) => [...subArr]);
}; 


const Board = () => {
   const {
     level,
     pushes,
     updatePushesCount,
     moves,
     updateMovesCount,
     time,   
     startGame, 
     updateGameEnded,
     gameEnded,   
     gameEndMessages,
     isNewHighscore,
     resetLevel,    
   } = useContext(ScoreDataContext);
   const [boardSize, setBoardSize] = useState({ numRows: 0, numCols: 0 });
  const [storageLocations, setStorageLocation] = useState<IPosition[]>([]);
 const [board, setBoard] = useState<number[][]>(deepCopy(levels[level].board));
  const [charPos, setCharPos] = useState<IPosition>({ x: -1, y: -1 });
  const [boxLocations, setBoxLocations] = useState<IPosition[]>([]);
  const [characterDirection, setCharacterDirection] =
    useState<Direction>("down");
    const [isCtrlPressed, setIsCtrlPressed] = useState<boolean>(false);

    const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  setCharPos(getCharStartPosition()); 
   
    setStorageLocation(getStorageLocations(level));
   
  }, []);

  useEffect (() => {
    const newBoard = deepCopy(levels[level].board);
    setBoard(newBoard);
      setCharPos(getCharStartPosition(newBoard));   
      setStorageLocation(getStorageLocations(level));
      setBoardSize({ numRows: newBoard.length, numCols: newBoard[0].length });
  
  },[level])

  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

   const getCharStartPosition = (resetBoard?: number[][]) => {

    const newBoard = resetBoard ?? board;
    const posY = newBoard.findIndex((row) => row.includes(5));
    const posX = newBoard[posY].findIndex((x) => x === 5);
    return { x: posX, y: posY };
  };

  const updateBoard = (y: number, x: number) => {
    const isStorageLocation = storageLocations.some(
      (pos) => pos.y === charPos.y && pos.x === charPos.x
    );
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[charPos.y][charPos.x] = isStorageLocation ? 4 : 3;
      newBoard[y][x] = 5;
      return newBoard;
    });
    setCharPos({ x, y });

    updateMovesCount();
    checkCompletion();
    if (moves === 0) {
      startGame();
    }
  };

  const checkCompletion = () => {
    const correct = getCorrectBoxCount(storageLocations, boxLocations);  
    if (correct === 1) {
      updateGameEnded(level);
      setCharacterDirection("down");
    }
  };

  const updateBoxPosition = (y: number, x: number, oldPos: IPosition | undefined = undefined) => {
   
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      if(oldPos){
        const isStorageLocation = storageLocations.some(
          (pos) => pos.y === oldPos.y && pos.x === oldPos.x);
        newBoard[oldPos.y][oldPos.x] = isStorageLocation ? 4 : 3;
      }
      newBoard[y][x] = 2;
      return newBoard;
    });
    setBoxLocations(() => getBoxLocations(level, board));
    updatePushesCount();
  };

  const getTileImage = (rowIndex: number, colIndex: number) => {
    const tile = board[rowIndex][colIndex];

    if (rowIndex === charPos.y && colIndex === charPos.x) {
      return characterImages[characterDirection] || sandLayout[tile];
    }
    if (tile === 2) {
      const isOnStorage = storageLocations.some(
        (pos) => pos.y === rowIndex && pos.x === colIndex
      );
      return isOnStorage ? sandLayout[5] : sandLayout[tile];
    }
    return sandLayout[tile];
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && !isCtrlPressed) {
        event.preventDefault();
        setIsCtrlPressed(true);
        console.log("ctrl pressed")
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey && isCtrlPressed) {
        setIsCtrlPressed(false);
      }
    };
  
    const gameContainer = gameContainerRef.current;
  
    if (gameContainer) {
      gameContainer.addEventListener("keydown", handleKeyDown);
      gameContainer.addEventListener("keyup", handleKeyUp);
  
      return () => {
        gameContainer.removeEventListener("keydown", handleKeyDown);
        gameContainer.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [isCtrlPressed]);

  const keyToDirection: ICharDirection = {
    ArrowUp: { direction: "up", deltaY: -1, deltaX: 0 },
    ArrowDown: { direction: "down", deltaY: 1, deltaX: 0 },
    ArrowLeft: { direction: "left", deltaY: 0, deltaX: -1 },
    ArrowRight: { direction: "right", deltaY: 0, deltaX: 1 },
  };

  const handleKeyDown = (key: string) => {
    // event.preventDefault();
    if (gameEnded) return;
    if (!keyToDirection[key]) return;
    const { y: posY, x: posX } = charPos;
    const { direction, deltaY, deltaX } = keyToDirection[key];

    const newPos: IPosition = { x: posX + deltaX, y: posY + deltaY };
    const oppPos: IPosition = { x: posX - deltaX, y: posY - deltaY };
    const newBoxPos: IPosition = { x: newPos.x + deltaX, y: newPos.y + deltaY };

    setCharacterDirection(direction);

    if(isCtrlPressed && [3, 4].includes(board[newPos.y][newPos.x]) && [2].includes(board[oppPos.y][oppPos.x])){
      console.log("here")
      updateBoard(newPos.y, newPos.x)
      updateBoxPosition(charPos.y, charPos.x, oppPos)
      return;
    } 

    // Check if the new position is a valid move
    if ([3, 4].includes(board[newPos.y][newPos.x])) {
      updateBoard(newPos.y, newPos.x);
      return;
    }
    // Check if pushing a box to the new position is a valid move
    if (board[newPos.y][newPos.x] === 2 && [3, 4].includes(board[newBoxPos.y][newBoxPos.x])) {
      updateBoxPosition(newBoxPos.y, newBoxPos.x);
      updateBoard(newPos.y, newPos.x);
      return;
    }
  };

  const restartLevel = () => {
    setBoard(deepCopy(levels[level].board));
    setCharPos(getCharStartPosition(deepCopy(levels[level].board)))
    setBoxLocations(getBoxLocations(level));
    setCharacterDirection("down");
    resetLevel();
  }

  return (
    <div className="game-container">
      <Arrows onKeyDown={handleKeyDown} />
      <Highscore
        level={level}
        pushes={pushes}
        moves={moves}
        time={time}
        restartLevel={restartLevel}
      />

      {gameEnded && (
        <Modal
          title={gameEndMessages.title}
          message1={gameEndMessages.message1}
          message2={gameEndMessages.message2}
          data={gameEndMessages.data}
          onConfirm={gameEndMessages.onConfirm}
          restart={restartLevel}
        />
      )}
      {isNewHighscore && <InputModal />}
      <div
        className="board"
        ref={gameContainerRef}
        style={
          {
            "--numRows":
              boardSize.numRows > boardSize.numCols
                ? boardSize.numRows
                : boardSize.numCols,
          } as React.CSSProperties
        }
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e.key)}
      >
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((_tile, colInd) => (
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
