import { useRef, useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import "./App.css";
import "./fonts/edmund-free.ttf";
import About  from "./pages/About";
import { Play } from "./pages/Play";
import { HighscorePage } from "./pages/HighscorePage";
import GamePlay from "./pages/GamePlay";
import LevelCreator from "./pages/LevelCreator";


export function App() {
  const location = useLocation();
  const windowRef = useRef(window);
  const [isMobile, setIsMobile] = useState(false);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);

  // Function to check if the device has touch capabilities
  const isTouchDevice = useCallback(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );

  // Function to handle resize event
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 810 || window.innerHeight < 480);
  }, []);

  useEffect(() => {
    // Function to handle orientation change
    const handleOrientationChange = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
      setShowRotatePrompt(
        window.innerHeight <= window.innerWidth && isTouchDevice()
      );
    };

    // Function to handle window resize based on touch device and orientation
    const handleWindowResize = () => {
      handleResize();
      setShowRotatePrompt(
        isTouchDevice() && isMobile && window.innerHeight > window.innerWidth
      );
    };

    handleResize();
    windowRef.current.addEventListener("resize", handleResize);
    windowRef.current.addEventListener(
      "orientationchange",
      handleOrientationChange
    );
    window.addEventListener("resize", handleWindowResize);

    return () => {
      windowRef.current.removeEventListener("resize", handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      windowRef.current.removeEventListener(
        "orientationchange",
        handleOrientationChange
      );
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleResize, isMobile, isTouchDevice]);

  // Check if the Navbar should be hidden based on the route and device type
  const hideNavbar = /^\/play\/\d+$/.test(location.pathname) && isMobile;

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {/* Show rotation prompt if necessary */}
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
      {/* Overlay for rotation prompt */}
      {showRotatePrompt && <div className="overlay"></div>}
      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/levels/:mode" element={<Play />} />
        <Route path="/play/custom/:id" element={<GamePlay />} />
        <Route path="/play/:id" element={<GamePlay />} />
        <Route path="/play/powerups/:id" element={<GamePlay />} />
        <Route path="/create-level" element={<LevelCreator />} />
        <Route path="/highscore/:id?" element={<HighscorePage />} />
        {/* Define other routes here */}
      </Routes>
    </div>
  );
}
