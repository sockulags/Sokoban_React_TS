import "./moves.css"

interface IMovesProps {
    moves:number
}

const Moves = (props:IMovesProps) => {
    return ( 
        <>
         <div className="moves">
           MOVE: {props.moves}
         </div>
        </>
     );
}
 
export default Moves;