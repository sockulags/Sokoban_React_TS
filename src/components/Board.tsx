import Tile from "./Tile";
import {level1, level1Layout} from "../data/levels"
import "./board.css"

const Board = () => {
    return ( 

        <>
        <div className="board">
            {level1.map(row => {
            return <div className="row">{row.map(tile => {
                return <Tile image={level1Layout[tile]}/>
            })}</div>
            })}
        </div>
         
        </>
     );
}
 
export default Board;