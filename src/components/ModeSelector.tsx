import "./ModeSelector.css";

interface ModeSelectosProps {
  normalMode: boolean;
  changeMode: (mode: boolean) => void;
}

const ModeSelector = ({ normalMode, changeMode }: ModeSelectosProps) => {
  return (
    <div className="checkbox-container">
      <h2>Select Mode:</h2>
      <h3>Normal</h3>
      <div
        className={`customCheckbox ${normalMode ? "checked" : ""}`}
        onClick={() => changeMode(!normalMode)}
      ></div>
      <h3>Power-ups</h3>{" "}
      <div
        className={`customCheckbox ${!normalMode ? "checked" : ""}`}
        onClick={() => changeMode(!normalMode)}
      ></div>
    </div>
  );
};

export default ModeSelector;
