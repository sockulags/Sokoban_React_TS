import { Level } from '../components/Level';
import {levels} from "../data/levels";
import './Home.css';
import { getCurrentLevel } from '../data/functions';

export const Home = () => {
  const currLvl = getCurrentLevel();
  return (
    <div className="homepage">
      <section className="welcome">
        <h1>Welcome!</h1>
        <p>Ready to solve your next puzzle? Let's play!</p>
        <Level level={levels[currLvl].level} image={levels[currLvl].image} />
      </section>
      <section className="what-is">
        <h2>What is Sokoban?</h2>
        <p>
          Sokoban is a timeless puzzle game where you push crates onto target
          squares within a maze.
        </p>
        <p>
          It's a challenging test of your spatial reasoning and problem-solving
          skills.
        </p>
        <a>Read More...</a>
      </section>
      <section className="features-section">
        <h2>Features</h2>
        <p>Engaging puzzles with increasing difficulty</p>
        <p>Intuitive controls for smooth gameplay</p>
        <p>Multiple levels to explore</p>
        <p>Beautifully designed graphics and animations</p>
      </section>
      <section className="cta-section">
        <h2>Ready to Play?</h2>       
      </section>
      <footer className="footer">
        <p>&copy; 2024 Sokoban React Web App. All rights reserved.</p>
      </footer>
    </div>
  );
}

