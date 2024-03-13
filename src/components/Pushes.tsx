import "./pushes.css"

interface IPushesProps {
    pushes:number
}

const Pushes = (props:IPushesProps) => {
    return (
      <>
        <div className="pushes">PUSH: {props.pushes}</div>
      </>
    );
}
 
export default Pushes;