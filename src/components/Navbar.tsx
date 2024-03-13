import './Navbar.css';
import Logo from "../assets/sokoban-header.png"

interface NavbarRoutes{
    id: number;
    name: string;
    path: string;
}

const routes:NavbarRoutes[] = [{
    id: 1,
    name: "Home",
    path: "/",
},{
    id: 2,
    name: "About",
    path: "/about",
},
{
    id: 3,
    name: "Highscore",
    path: "/highscore",
}
]

export const Navbar = () => {

    const handleClick = (path:string) => {
        console.log("Try to navigate to " + path)
    }

    return (
        <div className='navbar-container'>
           <div className="logo-container">
            <img src={Logo}/>
           </div>
           <div className="navbar-links">
{routes.map(route => {
    return <h2 key={route.id} onClick={() => handleClick(route.path)}>{route.name}</h2>
})}
           </div>
        </div>
    );
}