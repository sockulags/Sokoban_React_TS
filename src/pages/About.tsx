import React, { useState } from "react";
import "./About.css";

const About = () => {
  const [activeTabPlay, setActiveTabPlay] = useState("goal");
  const [activeTabCreate, setActiveTabCreate] = useState("HowItWorks");

  const toggleTabPlay = (tabName:string) => {
    setActiveTabPlay(tabName === activeTabPlay ? "" : tabName);
  };

  const toggleTabCreate = (tabName:string) => {
    setActiveTabCreate(tabName === activeTabCreate ? "" : tabName);
  };

  return (
    <div className="how-to-container">
      <h1>What is Sokoban?</h1>
      <p>
        Sokoban is a classic puzzle game that originated in Japan in the early
        1980s. Its name translates to "warehouse keeper" in Japanese. The game
        features simple yet challenging gameplay that has captivated players for
        decades.
      </p>
      <h2>History</h2>
      <p>
        Sokoban was created by Japanese game designer Hiroyuki Imabayashi in
        1981. It gained popularity in Japan and was later introduced to the
        international gaming community. The simplicity of its concept combined
        with its challenging gameplay made it a hit among puzzle enthusiasts.
      </p>
      <p>
        Over the years, Sokoban has been ported to various platforms and has
        inspired numerous adaptations and sequels. Its enduring appeal has
        solidified its status as one of the most iconic puzzle games of all
        time.
      </p>

      <h1>How To Play </h1>

      <div className="tabs">
        <button
          className={`tab-button ${activeTabPlay === "goal" ? "active" : ""}`}
          onClick={() => toggleTabPlay("goal")}
        >
          Goal
        </button>
        <button
          className={`tab-button ${
            activeTabPlay === "controls" ? "active" : ""
          }`}
          onClick={() => toggleTabPlay("controls")}
        >
          Controls
        </button>
        <button
          className={`tab-button ${activeTabPlay === "rules" ? "active" : ""}`}
          onClick={() => toggleTabPlay("rules")}
        >
          Rules
        </button>
        <button
          className={`tab-button ${
            activeTabPlay === "power-ups" ? "active" : ""
          }`}
          onClick={() => toggleTabPlay("power-ups")}
        >
          Power-ups
        </button>
        <button
          className={`tab-button ${
            activeTabPlay === "highscore" ? "active" : ""
          }`}
          onClick={() => toggleTabPlay("highscore")}
        >
          Highscore
        </button>
        <button
          className={`tab-button ${activeTabPlay === "tips" ? "active" : ""}`}
          onClick={() => toggleTabPlay("tips")}
        >
          Tips
        </button>
        <button
          className={`tab-button ${activeTabPlay === "ready" ? "active" : ""}`}
          onClick={() => toggleTabPlay("ready")}
        >
          Ready to Play?
        </button>
      </div>

      <div className="content-container content-play">
        <div
          id="goal"
          className={`tab ${activeTabPlay === "goal" ? "active" : ""}`}
        >
          <h2>Goal</h2>
          The objective of Sokoban is to push all the boxes onto the storage
          locations (marked by dots) within the warehouse. Once all the boxes
          are correctly placed, the level is completed, and the player can
          progress to the next challenge.
        </div>

        <div
          id="controls"
          className={`tab ${activeTabPlay === "controls" ? "active" : ""}`}
        >
          <h2>Controls</h2>
          <h3>Desktop</h3>
          Use the arrow keys (up, down, left, right) to move the player
          character around the warehouse. You can push boxes by moving into them
          from the direction you want them to move.
          <h3>Mobile</h3> On mobile devices, a directional pad (D-pad) will
          appear on the screen. Tap the arrows on the D-pad to move the player
          character in the corresponding direction. To push boxes, simply move
          the character towards them.
        </div>

        <div
          id="rules"
          className={`tab ${activeTabPlay === "rules" ? "active" : ""}`}
        >
          <h2>Rules</h2>
          <p>
            The player character can only push one box at a time. Boxes can only
            be pushed, not pulled. Boxes can't be pushed into walls or other
            boxes, so plan your moves carefully! The warehouse may contain
            obstacles such as walls or tight spaces that restrict movement.
            Deadlocks: Avoid getting boxes stuck in corners or against walls
            with no way to move them, as this can lead to a deadlock situation
            where the puzzle becomes unsolvable. If this happens, the player may
            need to restart the level.
          </p>
        </div>

        <div
          id="power-ups"
          className={`tab ${activeTabPlay === "power-ups" ? "active" : ""}`}
        >
          <h2>Power-ups</h2>
          <p>
            There are two types of levels: regular levels and levels featuring
            power-ups. These power-ups grant the player special abilities,
            providing them with unique superpowers. They activate when the
            character steps over them during the level.
          </p>
          <h3>Super strength</h3>
          <p>
            With Super Strength activated, you can push two boxes
            simultaneously.
          </p>
          <h3>Drag box</h3>
          <p>
            When activating Drag Box, you gain the ability to drag a box by
            pressing the Ctrl button.
          </p>
        </div>

        <div
          id="highscore"
          className={`tab ${activeTabPlay === "highscore" ? "active" : ""}`}
        >
          <h2>Highscore</h2>
          <p>
            The game has a scoring System based on the number of moves taken and
            the time elapsed to complete each level. Strive to achieve the
            highest score possible by solving puzzles efficiently.
          </p>
        </div>

        <div
          id="tips"
          className={`tab ${activeTabPlay === "tips" ? "active" : ""}`}
        >
          <h2>Tips</h2>
          <ul>
            <li>
              <b>Plan Your Moves: </b> Think ahead and visualize the steps
              needed to push each box into its designated storage location.
            </li>
            <li>
              <b>Avoid Getting Stuck: </b>If you push a box into a corner or
              against a wall with no space to move, you may get stuck and need
              to restart the level.
            </li>
            <li>
              <b>Use Reset Functionality: </b>If you do get stuck you can use
              the reset function to restart the level.
            </li>
          </ul>
        </div>

        <div
          id="ready"
          className={`tab ${activeTabPlay === "ready" ? "active" : ""}`}
        >
          <h2>Ready to Play?</h2>
          <p>
            Now that you understand the rules and controls of Sokoban, it's time
            to put your puzzle-solving skills to the test! Navigate through the
            warehouse, strategically push boxes into position, and complete each
            level to become a Sokoban master.
          </p>
        </div>
      </div>

      <div className="content-container content-create">
        <div>
          <h1>Create Your Own Levels in Sokoban</h1>
          <p>
            In addition to playing pre-designed levels, Sokoban offers players
            the exciting opportunity to create their own custom levels and
            challenges. With the level editor feature, players can unleash their
            creativity and design unique puzzles to share with friends. The
            feature is only active in desktop mode.
          </p>
        </div>

        <div className="tabs">
          <button
            className={`tab-button ${
              activeTabCreate === "HowItWorks" ? "active" : ""
            }`}
            onClick={() => toggleTabCreate("HowItWorks")}
          >
            How It Works
          </button>
          <button
            className={`tab-button ${
              activeTabCreate === "TipsforLevelDesign" ? "active" : ""
            }`}
            onClick={() => toggleTabCreate("TipsforLevelDesign")}
          >
            Tips for Level Design
          </button>
          <button
            className={`tab-button ${
              activeTabCreate === "ReadytoCreate?" ? "active" : ""
            }`}
            onClick={() => toggleTabCreate("ReadytoCreate?")}
          >
            Ready to Create?
          </button>
        </div>

        <div
          id="HowItWorks"
          className={`tab ${activeTabCreate === "HowItWorks" ? "active" : ""}`}
        >
          <h2>How It Works</h2>
          <ul>
            <li>
              <b>Accessing the Level Editor: </b>
              Navigate to the "Create Level" option in the game's menu to access
              the level editor feature.
            </li>
            <li>
              <b>Designing Your Level:</b> Use intuitive tools and controls to
              design your custom Sokoban level. Place walls, boxes, storage
              locations, and the player character on the grid-based editor
              canvas to create your puzzle layout.
            </li>
            <li>
              <b>Saving Your Creation:</b> When you're satisfied with your
              custom level, save it to your game profile or device. Give your
              level a descriptive name to help other players understand its
              theme or challenge.
            </li>
            <li>
              <b>Testing Your Level:</b> Once your level is designed, take it
              for a test run! Play through your custom level to ensure that it
              is challenging yet solvable. Make adjustments as needed to
              fine-tune the difficulty and flow of the puzzle.
            </li>
          </ul>
        </div>
        <div
          id="TipsforLevelDesign"
          className={`tab ${
            activeTabCreate === "TipsforLevelDesign" ? "active" : ""
          }`}
        >
          <h2>Tips for Level Design</h2>
          <ul>
            <li>
              <b>Start Simple: </b>Begin with basic puzzle layouts and gradually
              increase the complexity as you become more familiar with the level
              editor tools.
            </li>
            <li>
              <b>Balance Challenge and Enjoyment: </b>Strive to create puzzles
              that are challenging yet enjoyable to solve. Avoid overly complex
              or frustrating designs that may deter players from completing your
              level.
            </li>
            <li>
              <b>Playtest Regularly: </b>Test your custom levels frequently to
              identify any potential issues or bottlenecks.
            </li>
            <li>
              <b>Be Creative: </b>Experiment with different themes, shapes, and
              configurations to create unique and engaging puzzle experiences.
            </li>
          </ul>
        </div>
        <div
          id="ReadytoCreate?"
          className={`tab ${
            activeTabCreate === "ReadytoCreate?" ? "active" : ""
          }`}
        >
          <h2>Ready to Create?</h2> Now that you know how to use the level
          editor feature in Sokoban, it's time to unleash your imagination and
          start crafting your own custom puzzles! Design intricate mazes, clever
          challenges, and mind-bending puzzles to share with the world and
          challenge fellow Sokoban enthusiasts
        </div>
      </div>
    </div>
  );
};

export default About;
