import Tile from "./Tile";
import emptySpace from "../assets/GroundGravel_Sand.png"
import {level1} from "../data/levels"
import "./board.css"

const Board = () => {
    return ( 

        <>
        <div className="board">
            {level1.map(row => {
            return <div className="row">{row.map(tile => {
                return <Tile image={emptySpace}/>
            })}</div>
            })}
        </div>
         
        </>
     );
}
 
export default Board;