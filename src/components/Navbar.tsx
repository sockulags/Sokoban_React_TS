import './Navbar.css';
import Logo from "../assets/sokoban-header.png"

export const Navbar = () => {
    return (
        <div className='navbar-container'>
           <div className="logo-container">
            <img src={Logo}/>
           </div>
           <div className="navbar-links">
           <h2>Home</h2>
           <h2>Highscores</h2>
           <h2>How To Play</h2>
           </div>
        </div>
    );
}