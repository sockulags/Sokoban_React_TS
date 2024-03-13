interface IPushesProps {
    pushes:number
}

const Pushes = (props:IPushesProps) => {
    return ( 
        <>
        PUSHES: {props.pushes}
        </>
     );
}
 
export default Pushes;