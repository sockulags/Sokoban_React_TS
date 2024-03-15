import "./Tile.css";

type Props = {
  getTileImage: (rowIndex: number, colIndex: number) => string;
  rowIndex: number;
  colIndex: number;
  isThemeLight: boolean;
};

const Tile = ({ getTileImage, rowIndex, colIndex, isThemeLight }: Props) => {
  const image = getTileImage(rowIndex, colIndex);

  return (
    <div className={`tile ${isThemeLight ?'light': 'dark'}`}>
      <img src={image} />
    </div>
  );
};

export default Tile;
