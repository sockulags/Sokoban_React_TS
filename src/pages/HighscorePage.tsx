import "./HighscorePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getHighscores } from "../data/functions";
interface HighscoreProps {
  id: number;
  name: string;
  score: number;
  time: string;
  moves: number;
}

export const HighscorePage = () => {
  const [leaderboard, setLeaderboard] = useState<HighscoreProps[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const highscore: HighscoreProps[] = getHighscores(parseInt(id));
      if (highscore) setLeaderboard(highscore);
    } else {
      setLeaderboard([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderHeader() {
    if (leaderboard.length === 0) {
      return (
        <>
          <div className="no-highscore-to-show">
            No highscore to show for this level
          </div>
        </>
      );
    } else {
      const keys = Object.keys(leaderboard[0]);
      console.log(keys[1]);
      return (
        <div className="highscore-header">
          <div>Nr</div>
          {keys.map((key, index) => (
            <div key={key}>{key}</div>
          ))}
        </div>
      );
    }
  }

  function renderRows() {
    const sortedArr = leaderboard.sort((a, b) => b.score - a.score);
    console.log(sortedArr);
    return sortedArr.map((rowData, index) => (
      <div className="highscore-row" key={index + 1}>
        <div>{index + 1}</div>
        {Object.values(rowData).map((value, colIndex) => (
          <div key={colIndex}>{value}</div>
        ))}
      </div>
    ));
  }

  return (
    <div className="highscorepage-container">
      <h1>Highscore level {id}</h1>
      <div>{renderHeader()}</div>
      <div className="highscore-body">{renderRows()}</div>
    </div>
  );
};
