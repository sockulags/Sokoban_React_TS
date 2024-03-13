import Board from "./components/Board";
import "./App.css"
import "./fonts/edmund-free.ttf";
import { Navbar } from "./components/Navbar";


export function App() {


  return (
    <div>
      <Navbar/>
   
      <Board/>
    </div>
  );
}
