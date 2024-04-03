import "./Control.css";

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
        <div className="action">Pull the box</div>
        <div className="key">Pull the box using Ctrl+arrow keys.</div>
      </div>
    </div>
  );
}

export default Control