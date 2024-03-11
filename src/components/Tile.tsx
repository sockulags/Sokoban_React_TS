import "./Tile.css";
// import { useState } from "react";

type Props = {
  image: string;
};

const Tile = ({image}: Props) => {
  // const [key, setKey] = useState<string>();


  return (   
    <div className="tile">
      <img src={image} /> 
     
     </div>
  ) 
};

export default Tile;