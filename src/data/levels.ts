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
import character from "../assets/Character4.png";
import boxInStorageLocation from "../assets/Crate_Brown.png";
import characterUp from "../assets/Character7.png";
import characterLeft from "../assets/Character1.png";
import characterRight from "../assets/Character2.png";





export const level0 = [
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

export const level2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 4, 4, 3, 3, 1, 3, 3, 3, 3, 3, 1, 1, 1],
  [1, 4, 4, 3, 3, 1, 3, 2, 3, 3, 2, 3, 3, 1],
  [1, 4, 4, 3, 3, 1, 2, 1, 1, 1, 1, 3, 3, 1],
  [1, 4, 4, 3, 3, 3, 3, 5, 3, 1, 1, 3, 3, 1],
  [1, 4, 4, 3, 3, 1, 3, 1, 3, 3, 2, 3, 1, 1],
  [1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 3, 2, 3, 1],
  [0, 0, 1, 3, 2, 3, 3, 2, 3, 2, 3, 2, 3, 1],
  [0, 0, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const level1Layout = [
  outOfBounds,
  wall,
  box,
  emptySpace,
  storageLocation,
  character,
  boxInStorageLocation,
  characterUp,
  characterLeft,
  characterRight,
];
