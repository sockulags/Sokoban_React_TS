import { useContext } from "react";
import "./moves.css"
import { ScoreDataContext } from "../context/ScoreDataContext";

const Moves = () => {

  const {moves} = useContext(ScoreDataContext);

    return ( 
        <>
         <div className="moves">
           MOVE: {moves}
         </div>
        </>
     );
}
 
export default Moves;