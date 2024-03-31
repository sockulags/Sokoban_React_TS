import React, { useRef, useState, useEffect, useCallback } from "react";
import {
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
  const windowRef = useRef(window);
  const [isMobile, setIsMobile] = useState(false);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 810 || window.innerHeight < 480);
  }, []);

  useEffect(() => {
    handleResize();
    windowRef.current.addEventListener("resize", handleResize);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      windowRef.current.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
      setShowRotatePrompt(window.innerHeight <= window.innerWidth);
    };
    handleOrientationChange();
    windowRef.current.addEventListener(
      "orientationchange",
      handleOrientationChange
    );
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      windowRef.current.removeEventListener(
        "orientationchange",
        handleOrientationChange
      );
    };
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      handleResize(); 
      if (isMobile && window.innerHeight > window.innerWidth) {
        setShowRotatePrompt(true); 
      } else {
        setShowRotatePrompt(false); 
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [isMobile, handleResize]);

  const hideNavbar = /^\/play\/\d+$/.test(location.pathname) && isMobile;

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {showRotatePrompt && (
        <div className="rotate-prompt">
          <div>
            <span className="material-symbols-outlined rotate-icon">
              screen_rotation
            </span>
          </div>
          <div className="rotate-text">
            Please rotate your device to landscape mode to play the game
          </div>
        </div>
      )}
      {showRotatePrompt && <div className="overlay"></div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/:id" element={<GamePlay />} />
        <Route path="/highscore/:id?" element={<HighscorePage />} />
        {/* Define other routes here */}
      </Routes>
    </div>
  );
}
