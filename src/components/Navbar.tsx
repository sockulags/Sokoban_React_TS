import "./Navbar.css";
import Logo from "../assets/sokoban-header.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface NavbarRoutes {
  id: number;
  name: string;
  path: string;
}

const routes: NavbarRoutes[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 3,
    name: "Play",
    path: "/play",
  },
  {
    id: 4,
    name: "Highscore",
    path: "/highscore",
  },
];

export const Navbar = () => {
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (path: string) => {
    nav(path);
    setIsMenuOpen(false); //Close menu when a link is clicked
  };

  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => handleClick("/")}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <button
          className="hamburger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul>
          {routes.map((route) => (
            <li key={route.id} onClick={() => handleClick(route.path)}>
              {route.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
