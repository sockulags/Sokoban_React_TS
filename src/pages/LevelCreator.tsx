import React, { useEffect, useState } from "react";
import "./LevelCreator.css";
import Tile from "../components/Tile";
import { layout } from "../data/layout";

const renderBoard = (size: number): number[][] => {
  const board: number[][] = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
};
const LevelCreator = () => {
  const [selectedSize, setSelectedSize] = useState(10);
  const [board, setBoard] = useState<number[][]>(renderBoard(selectedSize));

  const incrementSize = () => {
    setSelectedSize((prevSize) => (prevSize < 20 ? prevSize + 1 : prevSize));
  };

  useEffect(() => {
    setBoard(renderBoard(selectedSize));
  }, [selectedSize]);

  const decrementSize = () => {
    setSelectedSize((prevSize) => (prevSize > 10 ? prevSize - 1 : prevSize));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value);
    if (!isNaN(newSize) && newSize >= 10 && newSize <= 20) {
      setSelectedSize(newSize);
    }
  };
  const getTileImage = (rowIndex: number, colIndex: number) => {
    const tile = board[rowIndex][colIndex];

    return layout[tile][0];
  };

  return (
    <div className="levelcreator-container">
      <h2>Create Your Own Level</h2>
      <div className="select-size">
        Select Number of Rows/Columns:
        <div className="scrollable-input">
          <button className="less-btn" onClick={decrementSize}>
            -
          </button>
          <input
            type="number"
            value={selectedSize}
            onChange={handleSizeChange}
            min={10}
            max={20}
          />
          <button className="more-btn" onClick={incrementSize}>
            +
          </button>
        </div>
      </div>
      <div className="playground">
        <div
          className="board"
          style={{ "--size": selectedSize } as React.CSSProperties}
        >
          {board.map((row, rowIndex) =>
            row.map((_tile, colInd) => (
              <Tile
                key={`${rowIndex}-${colInd}`}
                getTileImage={getTileImage}
                rowIndex={rowIndex}
                colIndex={colInd}
              />
            ))
          )}
        </div>

        <div className="tiles-container">
          {layout.map((type, typeIndex) => (
            <div key={typeIndex} className="tile-row">
              {type.map((imageUrl, imageIndex) => (
                <div key={imageIndex} className="tile">
                  <img src={imageUrl} alt={`Tile ${typeIndex}-${imageIndex}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelCreator;
