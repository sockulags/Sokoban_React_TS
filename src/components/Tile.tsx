import "./Tile.css";
import boxInStorageLocation from "../assets/Crate_Brown.png";

type Props = {
  image: string;
  isOnStorage: boolean;
};

const Tile = ({ image, isOnStorage }: Props) => {
  const renderImage = () => {
    if (isOnStorage) {
      return <img src={boxInStorageLocation} />;
    } else {
      return <img src={image} />;
    }
  };

  return <div className="tile">{renderImage()}</div>;
};

export default Tile;
