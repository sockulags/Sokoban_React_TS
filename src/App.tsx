import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import "./App.css";
import "./fonts/edmund-free.ttf";
import { About } from "./pages/About";
import { Play } from "./pages/Play";
import { HighscorePage } from "./pages/HighscorePage";
import GamePlay from "./pages/GamePlay";

export function App() {
  const location = useLocation();
  const windowRef = useRef(window); // Create a referens to window object
  const [isMobile, setIsMobile] = useState(false);

    const handleResize = useCallback(() => {
      setIsMobile(windowRef.current.innerWidth < 768);
    }, [setIsMobile]);

 useEffect(() => {
   handleResize();
   windowRef.current.addEventListener("resize", handleResize);

   return () => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
     windowRef.current.removeEventListener("resize", handleResize);
   };
 }, [handleResize]);

  const hideNavbar = /^\/play\/\d+$/.test(location.pathname) && isMobile;

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:id" element={<GamePlay />} />
        <Route path="/highscore/:id?" element={<HighscorePage />} />
        {/* Definiera andra routes här */}
      </Routes>
    </div>
  );
}
