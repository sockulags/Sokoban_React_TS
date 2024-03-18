import "./Tile.css";

type Props = {
  getTileImage: (rowIndex: number, colIndex: number) => string;
  rowIndex: number;
  colIndex: number;
};

const Tile = ({ getTileImage, rowIndex, colIndex }: Props) => {
  const image = getTileImage(rowIndex, colIndex);

  return (
    <div className="tile">
      <img src={image} />
    </div>
  );
};

export default Tile;