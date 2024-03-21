import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import "./App.css";
import "./fonts/edmund-free.ttf";
import { About } from "./pages/About";
import { Play } from "./pages/Play";
import { HighscorePage } from "./pages/HighscorePage";
import GamePlay from "./pages/GamePlay";

export function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
          <Route path="/play/:id" element={<GamePlay />} />
          <Route path="/highscore/:id?" element={<HighscorePage />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router>
  );
}
