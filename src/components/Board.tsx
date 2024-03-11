import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import { level1, level1Layout } from '../data/levels';
import './board.css';

interface Position {
  x: number;
  y: number;
}

const Board = () => {
  const [board, setBoard] = useState<number[][]>(level1);
  const [charPos, setCharPos] = useState<Position | undefined>();

const getCharStartPosition = () => {
    const posY = board.findIndex(row=> row.includes(5));
    console.log(posY)
    const posX = board[posY].findIndex(x=> x === 5);
    console.log(posX)
    return {x: posX, y: posY}
}

useEffect(() => {
    const startPosition = getCharStartPosition();
    setCharPos(startPosition);
  }, []);

getCharStartPosition();
  const tryMove = (x: number, y: number, key: string) => {
    console.log(`Trying to move at position (${x}, ${y}) with key ${key}`);
    // Add your move logic here
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log('Key pressed:', event.key);
    if(charPos)
    tryMove(charPos.x, charPos.y, event.key);
    // Add your key event handling logic here, such as updating character position
  };

  return (
    <div className="board" tabIndex={0} onKeyDown={handleKeyDown} autoFocus>
      {level1.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((tile, colInd) => (
            <Tile
              key={`${rowIndex}-${colInd}`}
              image={level1Layout[tile]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
