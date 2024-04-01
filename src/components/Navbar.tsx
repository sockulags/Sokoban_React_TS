import "./Navbar.css";
import Logo from "../assets/sokoban-header.png";
import { useNavigate, useLocation } from "react-router-dom";

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
  {
    id: 5,
    name: "Create Level",
    path: "/create-level",
  },
];

export const Navbar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const handleClick = (path: string) => {
    nav(path);
  };
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    } else {
      return location.pathname.startsWith(path);
    }
  };

  return (
    <div className="navbar-container">
      <div className="logo-container" onClick={() => handleClick("/")}>
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar-links">
        {routes.map((route) => {
          const active = isActive(route.path);
          return (
            <h2
              key={route.id}
              onClick={() => handleClick(route.path)}
              className={active ? "active" : ""}
            >
              {route.name}
            </h2>
          );
        })}
      </div>
    </div>
  );
};
