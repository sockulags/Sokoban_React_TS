import "./howToPlay.css";

const HowToPlay = () => {
  return (
    <div className="how-to-container">
      <h1>How To Play </h1>

      <div>
        Sokoban is a classic puzzle game where the goal is to push boxes onto
        designated storage locations within a warehouse maze. The game is played
        on a grid-based board, where the player navigates a character around
        obstacles to solve each level.
      </div>
      <div>
        <h2>Game Objective</h2>
        The objective of Sokoban is to push all the boxes onto the storage
        locations (marked by dots) within the warehouse. Once all the boxes are
        correctly placed, the level is completed, and the player can progress to
        the next challenge.
      </div>
      <div>
        <h2>Controls</h2>
        <h3>Desktop</h3>
        Use the arrow keys (up, down, left, right) to move the player character
        around the warehouse. You can push boxes by moving into them from the
        direction you want them to move.
        <h3>Mobile</h3> On mobile devices, a directional pad (D-pad) will appear
        on the screen. Tap the arrows on the D-pad to move the player character
        in the corresponding direction. To push boxes, simply move the character
        towards them.
      </div>
      <div>
        <h2>Rules</h2>
        The player character can only push one box at a time. Boxes can only be
        pushed, not pulled. Boxes can't be pushed into walls or other boxes, so
        plan your moves carefully! The warehouse may contain obstacles such as
        walls or tight spaces that restrict movement. Deadlocks: Avoid getting
        boxes stuck in corners or against walls with no way to move them, as
        this can lead to a deadlock situation where the puzzle becomes
        unsolvable. If this happens, the player may need to restart the level.
      </div>
      <div>
        <h2>Highscore</h2>
        The game has a scoring System based on the number of moves taken and the
        time elapsed to complete each level. Strive to achieve the highest score
        possible by solving puzzles efficiently.
      </div>
      <div>
        <h2>Tips</h2>
        <ul>
          <li>
            Plan Your Moves: Think ahead and visualize the steps needed to push
            each box into its designated storage location.
          </li>
          <li>
            Avoid Getting Stuck: If you push a box into a corner or against a
            wall with no space to move, you may get stuck and need to restart
            the level.
          </li>
          <li>
            Use Reset Functionality: If you do get stuck you can use the reset 
            function to restart the level.
          </li>
        </ul>
      </div>
      <div>
        Ready to Play? Now that you understand the rules and controls of
        Sokoban, it's time to put your puzzle-solving skills to the test!
        Navigate through the warehouse, strategically push boxes into position,
        and complete each level to become a Sokoban master.
      </div>

      <div>
        <h1>Create Your Own Levels in Sokoban</h1>
        In addition to playing pre-designed levels, Sokoban offers players the
        exciting opportunity to create their own custom levels and challenges.
        With the level editor feature, players can unleash their creativity and
        design unique puzzles to share with friends.
      </div>
      <div>
        <h2>How It Works</h2>
        <ul>
          <li>
            <b>Accessing the Level Editor:</b>
            Navigate to the "Create Level" option in the game's menu to access
            the level editor feature.
          </li>
          <li>
            <b>Designing Your Level:</b> Use intuitive tools and controls to
            design your custom Sokoban level. Place walls, boxes, storage
            locations, and the player character on the grid-based editor canvas
            to create your puzzle layout.
          </li>
          <li>
            <b>Saving Your Creation:</b> When you're satisfied with your custom
            level, save it to your game profile or device. Give your level a
            descriptive name to help other players understand its theme or
            challenge.
          </li>
          <li>
            <b>Testing Your Level:</b> Once your level is designed, take it for
            a test run! Play through your custom level to ensure that it is
            challenging yet solvable. Make adjustments as needed to fine-tune
            the difficulty and flow of the puzzle.
          </li>
        </ul>
      </div>
      <div>
        <h2>Tips for Level Design</h2>
        <ul>
          <li>
            Start Simple: Begin with basic puzzle layouts and gradually increase
            the complexity as you become more familiar with the level editor
            tools.
          </li>
          <li>
            Balance Challenge and Enjoyment: Strive to create puzzles that are
            challenging yet enjoyable to solve. Avoid overly complex or
            frustrating designs that may deter players from completing your
            level.
          </li>
          <li>
            Playtest Regularly: Test your custom levels frequently to identify
            any potential issues or bottlenecks.
          </li>
          <li>
            Be Creative: Experiment with different themes, shapes, and
            configurations to create unique and engaging puzzle experiences.
          </li>
        </ul>
      </div>
      <br></br>
      <div>
        Ready to Create? Now that you know how to use the level editor feature
        in Sokoban, it's time to unleash your imagination and start crafting
        your own custom puzzles! Design intricate mazes, clever challenges, and
        mind-bending puzzles to share with the world and challenge fellow
        Sokoban enthusiasts
      </div>
      <div></div>
    </div>
  );
};

export default HowToPlay;
