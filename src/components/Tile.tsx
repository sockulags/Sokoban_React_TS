import "./Tile.css";

type Props = {
  getTileImage: (rowIndex: number, colIndex: number) => string;
  rowIndex: number;
  colIndex: number;
  onClick?: (rowIndex: number, colIndex: number) => void;
};

const Tile = ({ getTileImage, rowIndex, colIndex, onClick }: Props) => {
  const image = getTileImage(rowIndex, colIndex);

  const handleOnClick = () => {
    if(onClick)
    onClick(rowIndex, colIndex);
  console.log("Tile Clicked")
  }

  return (
    <div className="tile" onClick={handleOnClick} >
      <img src={image} onClick={() => handleOnClick}/>
    </div>
  );
};

export default Tile;