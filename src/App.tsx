import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import "./App.css";
import "./fonts/edmund-free.ttf";
import { About } from "./pages/About";
import { Play } from "./pages/Play";
import { HighscorePage } from "./pages/HighscorePage";

export function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
          <Route path="/highscore/:id?" element={<HighscorePage />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router>
  );
}
