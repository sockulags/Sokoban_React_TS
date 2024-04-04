import lvl0image from "../../assets/level_images/level_0.png";
import Clvl0image from "../../assets/power_up_level_images/level_0.png";

const level0 = [
    [0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 3, 3, 3, 1, 1, 1, 1],
    [0, 1, 3, 3, 3, 1, 3, 3, 1],
    [0, 1, 1, 3, 3, 3, 3, 4, 1],
    [1, 1, 1, 3, 1, 1, 1, 4, 1],
    [1, 3, 2, 3, 1, 0, 1, 4, 1],
    [1, 3, 2, 2, 1, 0, 1, 1, 1],
    [1, 5, 3, 3, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0],
  ];

  const customLevel0 = [[1,1,1,1,1,1],[1,20,3,3,2,1],[1,3,3,3,1,3],[1,1,4,1,1,3],[3,1,5,1,3,3],[3,1,1,1,3,3]]

export const l0 = { level: 0, board: level0, image: lvl0image}

export const cl0 = { level:0, board: customLevel0, image: Clvl0image}