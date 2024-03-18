import "./HighscorePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
interface HighscoreProps {
  id: number;
  name: string;
  score: number;
  time: string;
  moves: number;
}

const level0Score: HighscoreProps[] = [
  {
    id: 1,
    name: "John Doe",
    score: 12355,
    time: "01:15:30",
    moves: 140,
  },
  {
    id: 2,
    name: "Alice Smith",
    score: 11000,
    time: "01:10:45",
    moves: 150,
  },
  {
    id: 3,
    name: "Bob Johnson",
    score: 11500,
    time: "01:20:15",
    moves: 135,
  },
  {
    id: 4,
    name: "Emily Brown",
    score: 11800,
    time: "01:18:00",
    moves: 138,
  },
  {
    id: 5,
    name: "Michael Wilson",
    score: 10500,
    time: "01:25:20",
    moves: 155,
  },
];
const level1Score: HighscoreProps[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    score: 9000,
    time: "02:30:15",
    moves: 180,
  },
  {
    id: 2,
    name: "David Miller",
    score: 9200,
    time: "02:25:30",
    moves: 175,
  },
  {
    id: 3,
    name: "Emma Davis",
    score: 8500,
    time: "02:40:45",
    moves: 185,
  },
  {
    id: 4,
    name: "Matthew Wilson",
    score: 8800,
    time: "02:35:00",
    moves: 178,
  },
  {
    id: 5,
    name: "Olivia Taylor",
    score: 9300,
    time: "02:20:20",
    moves: 170,
  },
];

const level2Score: HighscoreProps[] = [
  {
    id: 1,
    name: "Daniel Martinez",
    score: 7500,
    time: "03:45:30",
    moves: 210,
  },
  {
    id: 2,
    name: "Sophia Garcia",
    score: 7200,
    time: "03:50:45",
    moves: 215,
  },
  {
    id: 3,
    name: "Liam Lopez",
    score: 7800,
    time: "03:35:15",
    moves: 205,
  },
  {
    id: 4,
    name: "Isabella Hernandez",
    score: 7400,
    time: "03:55:00",
    moves: 220,
  },
  {
    id: 5,
    name: "Ethan Gonzalez",
    score: 7700,
    time: "03:40:20",
    moves: 208,
  },
];

interface ScoreProps {
  [index: number]: HighscoreProps[];
}
const scores: ScoreProps = [level0Score, level1Score, level2Score];

export const HighscorePage = () => {
  const [leaderboard, setLeaderboard] = useState<HighscoreProps[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) setLeaderboard(scores[parseInt(id)]);
    else {
      setLeaderboard(scores[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function renderHeader() {
    const keys = Object.keys(scores[0][0]);
    return keys.map((key) => (
      <div key={key}>
        {key === "id" ? "Nr" : key[0].toUpperCase() + key.slice(1)}
      </div>
    ));
  }

  function renderRows() {
    const sortedArr = leaderboard.sort((a, b) => b.score - a.score);
    let place: number = 1;
    return sortedArr.map((score, index) => (
      <div key={index} className="highscore-row">
        {Object.values(score).map((value, index) => (
          <div key={index}>{index === 0 ? place++ + "." : value}</div>
        ))}
      </div>
    ));
  }

  return (
    <div className="highscorepage-container">
      <h1>Highscore level {id}</h1>
      <div className="highscore-header">{renderHeader()}</div>
      <div className="highscore-body">{renderRows()}</div>
    </div>
  );
};
