/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useRef } from "react";
import Tile from "./Tile";
import { sandLayout, characterImages } from "../data/levels";
import { powerUps } from "../data/layout";
import "./board.css";
import { ScoreDataContext } from "../context/ScoreDataContext";
import { IPosition, ICharDirection, Direction } from "../interface";
import {
  getBoxLocations,
  getStorageLocations,
  getCorrectBoxCount,
  playSound,
} from "../data/functions";
import Highscore from "./Highscore";
import Modal from "./Modal";
import InputModal from "./InputModal";
import { Arrows } from "./Arrows";


// import superStrength from "../assets/superStrength.";
import gameMusic from "../sounds/gameMusic.mp3"
import Settings from "./Settings";


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
     settings,
     levels
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

  const audioRef = useRef<HTMLAudioElement>(null);
  const gameAudioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.1);
  const [hasPullStrength, setHasPullStrength] = useState<boolean>(false);
  const [hasSuperStrength, setHasSuperStrength] = useState<boolean>(false);


  useEffect(() => {
    setCharPos(getCharStartPosition());

    setStorageLocation(getStorageLocations(level));
  }, []);


  useEffect(() => {
    const newBoard = deepCopy(levels[level].board);
    setBoard(newBoard);
    setCharPos(getCharStartPosition(newBoard));
    setStorageLocation(getStorageLocations(level));
    console.log(JSON.stringify(board))
    setBoardSize({ numRows: newBoard.length, numCols: newBoard[0].length });
  }, [level]);

  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);


  useEffect(() => {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
    const savedAudioSetting = localStorage.getItem("isAudioPlaying");
    if (savedAudioSetting !== null) {
      setIsAudioPlaying(JSON.parse(savedAudioSetting));
    }
    const savedMusicSetting = localStorage.getItem("isMusicPlaying");
    if (savedMusicSetting !== null) {
      setIsMusicPlaying(JSON.parse(savedMusicSetting));
    }
    const audio = gameAudioRef.current;
    const playMusic = () => {
      if (audio && isMusicPlaying) {
        audio.loop = true;
        audio.volume = volume;
        audio.play().catch((error) => {
          console.error("Failed to play music:", error);
        });
      }
    };
    document.addEventListener("click", playMusic);
    document.addEventListener("keyup", playMusic);
    return () => {
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keyup", playMusic);
      if (audio) {
        audio.pause();
      }
    };
  }, [volume, isMusicPlaying, isAudioPlaying]);

  const musicVolumeChange = (volume: number) => {
    const audio = gameAudioRef.current;
    if (audio) {
      audio.volume = volume;
      setVolume(volume);
      localStorage.setItem("volume", volume.toString());
    }
  }

  const toggleAudio = () => {
    setIsAudioPlaying((prevIsAudioPlaying) => {
      const newIsIsAudioPlaying = !prevIsAudioPlaying;
      localStorage.setItem("isAudioPlaying", JSON.stringify(newIsIsAudioPlaying));
      return newIsIsAudioPlaying;
    });
  };
  const toggleMusic = () => {
    setIsMusicPlaying((prevIsMusicPlaying) => {
      const newIsMusicPlaying = !prevIsMusicPlaying;
      localStorage.setItem("isMusicPlaying", JSON.stringify(newIsMusicPlaying));
      return newIsMusicPlaying;
    });
  };


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
    if (correct === 0) {
      updateGameEnded(level);
      setCharacterDirection("down");
      playSound(audioRef, "complete", isAudioPlaying);
    }
  };

  const updateBoxPosition = (y: number, x: number, oldPos: IPosition | undefined = undefined) => {
   
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      if(oldPos){
        const isStorageLocation = storageLocations.some(
          (pos) => pos.y === oldPos.y && pos.x === oldPos.x);
        newBoard[oldPos.y][oldPos.x] = isStorageLocation ? 4 : 3;
        if (isStorageLocation && board[y][x] === 4) {
          playSound(audioRef, "success", isAudioPlaying);
        }
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

    if(tile > 9){
      return powerUps[(tile/10)-1]
    }
    return sandLayout[tile];
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };
  
    const gameContainer = gameContainerRef.current;
  
    if (hasPullStrength && gameContainer) {
      gameContainer.addEventListener('keydown', handleKeyDown);
      gameContainer.addEventListener('keyup', handleKeyUp);
    } else {
      gameContainer?.removeEventListener('keydown', handleKeyDown);
      gameContainer?.removeEventListener('keyup', handleKeyUp);
    }
  
    return () => {
      gameContainer?.removeEventListener('keydown', handleKeyDown);
      gameContainer?.removeEventListener('keyup', handleKeyUp);
    };
  }, [hasPullStrength]);
  

  const keyToDirection: ICharDirection = {
    ArrowUp: { direction: "up", deltaY: -1, deltaX: 0 },
    ArrowDown: { direction: "down", deltaY: 1, deltaX: 0 },
    ArrowLeft: { direction: "left", deltaY: 0, deltaX: -1 },
    ArrowRight: { direction: "right", deltaY: 0, deltaX: 1 },
  };

  const alternateDirection: ICharDirection = {
    ArrowUp: { direction: "down", deltaY: -1, deltaX: 0 },
    ArrowDown: { direction: "up", deltaY: 1, deltaX: 0 },
    ArrowLeft: { direction: "right", deltaY: 0, deltaX: -1 },
    ArrowRight: { direction: "left", deltaY: 0, deltaX: 1 },
  };

  const handleKeyDown = (key: string) => {
    if (gameEnded) return;
    if (!keyToDirection[key])
     return;
    const { y: posY, x: posX } = charPos;
    const { direction, deltaY, deltaX } = isCtrlPressed ? alternateDirection[key] : keyToDirection[key];

    const newPos: IPosition = { x: posX + deltaX, y: posY + deltaY };
    const oppPos: IPosition = { x: posX - deltaX, y: posY - deltaY };
    const newBoxPos: IPosition = { x: newPos.x + deltaX, y: newPos.y + deltaY };
    const secondBoxNewPos: IPosition = { x: newBoxPos.x + deltaX, y: newBoxPos.y + deltaY };

    setCharacterDirection(direction);


    if(isCtrlPressed && [3].includes(board[newPos.y][newPos.x]) && [2].includes(board[oppPos.y][oppPos.x])){
      console.log("here")
      updateBoard(newPos.y, newPos.x)
      updateBoxPosition(charPos.y, charPos.x, oppPos)
      playSound(audioRef, "pull", isAudioPlaying);
      return;
    } 

    if(isCtrlPressed && [4].includes(board[newPos.y][newPos.x]) && [2].includes(board[oppPos.y][oppPos.x])){
      console.log("here")
      updateBoard(newPos.y, newPos.x)
      updateBoxPosition(charPos.y, charPos.x, oppPos)
      return;
    } 
  

    if (![0,1,2].includes(board[newPos.y][newPos.x])) {
      if(board[newPos.y][newPos.x] === 20) {
        setHasPullStrength(true);
        playSound(audioRef, "power", isAudioPlaying);
      }
      if(board[newPos.y][newPos.x] === 10){
         setHasSuperStrength(true)
         playSound(audioRef, "power", isAudioPlaying);
      }
      updateBoard(newPos.y, newPos.x);
      console.log(hasPullStrength)
      return;
    }

    if (hasSuperStrength && [2].includes(board[newPos.y][newPos.x]) && [2].includes(board[newBoxPos.y][newBoxPos.x])&& [3].includes(board[secondBoxNewPos.y][secondBoxNewPos.x])){
      updateBoxPosition(secondBoxNewPos.y, secondBoxNewPos.x);
      updateBoxPosition(newBoxPos.y, newBoxPos.x);
      updateBoard(newPos.y, newPos.x);
      playSound(audioRef, "push", isAudioPlaying);
      return;
    }

    if (hasSuperStrength && [2].includes(board[newPos.y][newPos.x]) && [2].includes(board[newBoxPos.y][newBoxPos.x])&& [4].includes(board[secondBoxNewPos.y][secondBoxNewPos.x])){
      updateBoxPosition(secondBoxNewPos.y, secondBoxNewPos.x);
      updateBoxPosition(newBoxPos.y, newBoxPos.x);
      updateBoard(newPos.y, newPos.x);
      playSound(audioRef, "success", isAudioPlaying);
      return;
    }

    if ([3].includes(board[newBoxPos.y][newBoxPos.x]) && [2].includes(board[newPos.y][newPos.x])){
      updateBoxPosition(newBoxPos.y, newBoxPos.x);
      updateBoard(newPos.y, newPos.x);
      playSound(audioRef, "push", isAudioPlaying);
      return;
    }

    if ([4].includes(board[newBoxPos.y][newBoxPos.x]) && [2].includes(board[newPos.y][newPos.x])){
      updateBoxPosition(newBoxPos.y, newBoxPos.x);
      updateBoard(newPos.y, newPos.x);
      playSound(audioRef, "success", isAudioPlaying);
      return;
    }  

   

    if (board[newPos.y][newPos.x] === 1) {
      playSound(audioRef, "wallHit", isAudioPlaying);
      return;
    } 
  };

  const restartLevel = () => {
    setBoard(deepCopy(levels[level].board));
    setCharPos(getCharStartPosition(deepCopy(levels[level].board)));
    setBoxLocations(getBoxLocations(level));
    setCharacterDirection("down");
    resetLevel();
    setHasPullStrength(false);
    setHasSuperStrength(false);
  };


  return (

    <div className="game-container">
      <audio ref={audioRef} />
      <audio ref={gameAudioRef} src={gameMusic} />
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
      {isNewHighscore && (
        <InputModal audioRef={audioRef} isAudioPlaying={isAudioPlaying} />
      )}
      {settings && (
        <Settings
          isAudioPlaying={isAudioPlaying}
          toggleAudio={toggleAudio}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
          volume={volume}
          musicVolumeChange={musicVolumeChange}
        />
      )}
      <div
        className="board"
        ref={gameContainerRef}
        style={
            {
              "--numRows": boardSize.numRows,
              "--numCols": boardSize.numCols,
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
