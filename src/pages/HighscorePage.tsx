import "./HighscorePage.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentLevel, getHighscores } from "../data/functions";
interface HighscoreProps {
  id: number;
  name: string;
  score: number;
  time: string;
  moves: number;
}
export const HighscorePage = () => {
  const lastCompletedLevel = getCurrentLevel() -1;
  const [leaderboard, setLeaderboard] = useState<HighscoreProps[]>([]);
  const { id } = useParams();
 const nav = useNavigate();
  useEffect(() => {
    if (id) {
      const highscore: HighscoreProps[] = getHighscores(parseInt(id ?? 0));
      if (highscore){
       setLeaderboard(highscore);
      } else{
        setLeaderboard([]);
      } 
    } else {
      
      nav("/highscore/"+lastCompletedLevel)
    }
  }, [id, setLeaderboard]);

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
      console.log(keys)
      return (
        <div className="highscore-header">
          <div>Nr</div>
          {keys.map((value, index) => (            
            <div className="header-text" key={index}>{value}</div>
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

  const handleClick = (level: number) =>{
    nav(`/highscore/${parseInt(id!) + level}`)
  }

  return (
    <div className="highscorepage-container">
      <h1>Highscore level {id ?? 0}</h1>
      {renderHeader()}
      <div className="highscore-body">
      {renderRows()}</div>
      <div className="other-levels-container">
      {id !== "0" && <button onClick={() => handleClick(-1)}><span className="material-symbols-outlined">arrow_left</span>Previous</button>}
      {id !== `${lastCompletedLevel}` &&  <button onClick={() => handleClick(1)}>Next<span className="material-symbols-outlined">arrow_right</span></button>}
      </div>
    </div>
  );
};
