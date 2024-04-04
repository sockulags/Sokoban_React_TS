import "./Control.css";
import superStrength from "../assets/super-strength.png";
import pullingStrength from "../assets/pulling-strength.png";

const Control = () => {
  return (
    <div className="control-container">
      <div className="control-item">
        <div className="action">Move and push the box</div>
        <div className="key">
          Move up, down, left and right using the arrow keys.
        </div>
      </div>
      <div className="control-item">
        <div className="action">Push two boxes</div>
        <div className="key">
          To be able to push two boxes, you need to get super-strength
          <img src={superStrength} />,
          and that is only able in levels with power-ups
        </div>
      </div>
      <div className="control-item">
        <div className="action">Pull a box</div>
        <div className="key">
          To be able to pull a box, you need to get pulling-strength
          <img src={pullingStrength} />,
          and that is only able in levels with power-ups. 
          You can use pulling-strenth by using Ctrl + arrow keys.
        </div>
      </div>
    </div>
  );
}

export default Control