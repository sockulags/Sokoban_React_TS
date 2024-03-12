/*
0 = outOfBound
1 = wall
2 = box
3 = emptySpace
4 = storageLocation
5 = character
*/

import outOfBounds from "../assets/Ground_Sand.png";
import wall from "../assets/Wall_Brown.png";
import box from "../assets/CrateDark_Red.png";
import emptySpace from "../assets/GroundGravel_Sand.png";
import storageLocation from "../assets/EndPoint_Red.png";
import character from "../assets/Character1.png";

export const level1 = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 3, 3, 2, 3, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 3, 1, 3, 1, 1, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 3, 3, 1, 3, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 3, 4, 4, 1],
  [1, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 1],
  [1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 5, 1, 1, 3, 3, 3, 4, 4, 1],
  [0, 0, 0, 0, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const level1Layout = [
  outOfBounds,
  wall,
  box,
  emptySpace,
  storageLocation,
  character,
];


