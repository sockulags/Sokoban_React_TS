import "./Tile.css";
type Props = {
  image: string;
};

const Tile = ({image}: Props) => {


  return (   
    <div className="tile">
      <img src={image} /> 
     
     </div>
  ) 
};

export default Tile;