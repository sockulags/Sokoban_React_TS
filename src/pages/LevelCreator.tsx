import React, { useEffect, useState } from "react";
import "./LevelCreator.css";
import Tile from "../components/Tile";
import { themes, powerUps } from "../data/layout";

const renderBoard = (size: number): number[][] => {
  const board: number[][] = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(3);
    }
    board.push(row);
  }
  return board;
};
type ThemeKey = keyof typeof themes;

const LevelCreator = () => {
  const [selectedSize, setSelectedSize] = useState(10);
  const [themeIndex, setThemeIndex] = useState<ThemeKey>("sand");
  const [tileType, setTileType] = useState<number>(0);
  const [board, setBoard] = useState<number[][]>(renderBoard(selectedSize));

  const incrementSize = () => {
    setSelectedSize((prevSize) => (prevSize < 20 ? prevSize + 1 : prevSize));
  };

  useEffect(() => {
    setBoard(renderBoard(selectedSize));
  }, [selectedSize]);

  const decrementSize = () => {
    setSelectedSize((prevSize) => (prevSize > 6 ? prevSize - 1 : prevSize));
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value);
    if (!isNaN(newSize) && newSize >= 6 && newSize <= 20) {
      setSelectedSize(newSize);
    }
  };

  const getTileImage = (rowIndex: number, colIndex: number) => {
    const tileType = board[rowIndex][colIndex];
    const theme: string[] = themes[themeIndex];
    return tileType > 9 ? powerUps[(tileType/10)-1] : theme[tileType];
  };

  const handleThemeChange = (themeIdx: ThemeKey) => {
    setThemeIndex(themeIdx);
  };

  const updateBoard = (
    rowIndex: number,
    colIndex: number,
    tileType: number
  ) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[rowIndex][colIndex] = tileType;
      return newBoard;
    });
  };

  const saveCustomLevel = () => {
    const customLevels = localStorage.getItem('customLevels');
    if(customLevels){
      const levels = JSON.parse(customLevels);
      levels.push(board);
      localStorage.setItem('customLevels', JSON.stringify(levels));
    } else{
      const levels = [];
      levels.push(board);
      localStorage.setItem('customLevels', JSON.stringify(levels));
    }
    setBoard(renderBoard(selectedSize));
  }

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
        <button onClick={saveCustomLevel}>Save</button>
        <div className="tiles-container">
        <div className="theme-selector">
            Character
            <div className="themes-images">              
                <img                
                src={themes.sand[5]}
                onClick={() => setTileType(5)}
                />
                
              </div>
          </div>
          <div className="theme-selector">
            Power-ups
            <div className="themes-images">
              {powerUps.map((imageUrl, imageIndex)=> (
                <img 
                key={imageIndex}
                src={imageUrl}
                onClick={() => setTileType((imageIndex+1)*10)}
                />
                
              ))}
            </div>
          </div>
        </div>
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
                onClick={() => updateBoard(rowIndex, colInd, tileType)}
              />
            ))
          )}
        </div>

        <div className="tiles-container">
  {Object.entries(themes).map(([themeName, theme]) => (
    <div
      key={themeName}
      className="theme-selector"
      onClick={() => handleThemeChange(themeName as ThemeKey)}
    >
      {themeName}
      <div className={`themes-images ${themeName === themeIndex ? "" : "disabled"}`}>
        {theme.map((imageUrl, imageIndex) => (
          ![0,5,6].includes(imageIndex) &&   <img
            key={imageIndex}
            src={imageUrl}
            className={themeName === themeIndex && tileType === imageIndex ? "active" : ""}
            alt={`Tile ${themeName}-${imageIndex}`}
            onClick={() => setTileType(imageIndex)}
          />
        ))}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default LevelCreator;
