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
import characterDown from "../assets/Character4.png";
import boxInStorageLocation from "../assets/Crate_Brown.png";
import characterUp from "../assets/Character7.png";
import characterLeft from "../assets/Character1.png";
import characterRight from "../assets/Character2.png";

//levels
import {l0, cl0} from "./levels/0";
import {l1, cl1} from "./levels/1";
import {l2, cl2} from "./levels/2";
import {l3,cl3} from "./levels/3";
import {l4, cl4} from "./levels/4";
import {l5, cl5} from "./levels/5";
import {l6,cl6} from "./levels/6";
import {l7, cl7} from "./levels/7";
import {l8, cl8} from "./levels/8";
import {l9, cl9} from "./levels/9";
import {l10, cl10} from "./levels/10";
import {l11, cl11} from "./levels/11";
import {l12, cl12} from "./levels/12";
import {l13} from "./levels/13";
import {l14} from "./levels/14";
import {l15} from "./levels/15";
import {l16} from "./levels/16";
import {l17} from "./levels/17";
import {l18} from "./levels/18";
import {l19} from "./levels/19";
import {l20} from "./levels/20";


export const sandLayout = [
  outOfBounds,
  wall,
  box,
  emptySpace,
  storageLocation,
  boxInStorageLocation,
];

export const characterImages = {
  up: characterUp,
  down: characterDown,
  left: characterLeft,
  right: characterRight,
};
export const powerLevels = [cl0, cl1, cl2, cl3, cl4, cl5, cl6, cl7, cl8 , cl9, cl10, cl11, cl12];
export const levels = [l0, l1, l2, l3, l4, l5, l6, l7, l8 , l9, l10, l11, l12, l13, l14, l15, l16, l17, l18, l19, l20];
