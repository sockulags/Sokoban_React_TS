import "./Navbar.css";
import Logo from "../assets/sokoban-header.png";
import { useNavigate } from "react-router-dom";

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
  const handleClick = (path: string) => {
    nav(path);
  };

  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => handleClick("/")}>
        <img src={Logo} />
      </div>
      <div className="navbar-links">
        {routes.map((route) => {
          return (
            <h2 key={route.id} onClick={() => handleClick(route.path)}>
              {route.name}
            </h2>
          );
        })}
      </div>
    </div>
  );
};
