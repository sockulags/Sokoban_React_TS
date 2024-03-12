import "./Tile.css";
// import { useState } from "react";

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