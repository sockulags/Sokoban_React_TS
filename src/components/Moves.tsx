interface IMovesProps {
    moves:number
}

const Moves = (props:IMovesProps) => {
    return ( 
        <>
         <div>
           MOVES: {props.moves}
         </div>
        </>
     );
}
 
export default Moves;