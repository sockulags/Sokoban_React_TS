
import { ScoreDataContextProvider } from "../context/ScoreDataContext";
import Board from "../components/Board";

const GamePage = () => {
  return (
    <ScoreDataContextProvider>
      <Board />
    </ScoreDataContextProvider>
  );
};

export default GamePage;
