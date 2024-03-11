import emptySpace from "../assets/GroundGravel_Sand.png"
import React from 'react'

type Props = {}

const Tile = (props) => {
  return (
    <div>
        <img src={props.image}/>
    </div>
  )
}

export default Tile