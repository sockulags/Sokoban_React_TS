import { useContext } from "react";
import { ScoreDataContext } from "../context/ScoreDataContext";
import "./pushes.css"

const Pushes = () => {
  const { pushes } = useContext(ScoreDataContext);
    return (
      <>
        <div className="pushes">PUSH: {pushes}</div>
      </>
    );
}
 
export default Pushes;