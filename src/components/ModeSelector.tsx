import { PlayMode } from "../interface";
import "./ModeSelector.css";

interface ModeSelectosProps {
  mode: PlayMode;
  changeMode: (mode: PlayMode) => void;
}

const ModeSelector = ({ mode, changeMode }: ModeSelectosProps) => {
  return (
    <div className="checkbox-container">
      <h2>Select Mode:</h2>
      <h3>Normal</h3>
      <div
        className={`customCheckbox ${mode === "normal" ? "checked" : ""}`}
        onClick={() => changeMode("normal")}
      ></div>
      <h3>Power-ups</h3>{" "}
      <div
        className={`customCheckbox ${mode === "powerups" ? "checked" : ""}`}
        onClick={() => changeMode("powerups")}
      ></div>
      <h3>Custom</h3>
      <div
        className={`customCheckbox ${mode === "custom" ? "checked" : ""}`}
        onClick={() => changeMode("custom")}
      ></div>
    </div>
  );
};

export default ModeSelector;
