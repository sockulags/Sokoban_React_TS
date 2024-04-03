// Importing crates
import beigeCrate from "../assets/Crate_Beige.png";
import blackCrate from "../assets/Crate_Black.png";
import blueCrate from "../assets/Crate_Blue.png";
import brownCrate from "../assets/Crate_Brown.png";
import grayCrate from "../assets/Crate_Gray.png";
import purpleCrate from "../assets/Crate_Purple.png";
import redCrate from "../assets/Crate_Red.png";
import yellowCrate from "../assets/Crate_Yellow.png";

// Importing crates at storage location
import beigeCrateStorage from "../assets/CrateDark_Beige.png";
import blackCrateStorage from "../assets/CrateDark_Black.png";
import blueCrateStorage from "../assets/CrateDark_Blue.png";
import brownCrateStorage from "../assets/CrateDark_Brown.png";
import grayCrateStorage from "../assets/CrateDark_Gray.png";
import purpleCrateStorage from "../assets/CrateDark_Purple.png";
import redCrateStorage from "../assets/CrateDark_Red.png";
import yellowCrateStorage from "../assets/CrateDark_Yellow.png";

// Importing wall images
import beigeWall from "../assets/Wall_Beige.png";
import blackWall from "../assets/Wall_Black.png";
import brownWall from "../assets/Wall_Brown.png";
import grayWall from "../assets/Wall_Gray.png";


// Importing ground images
import concreteGround from "../assets/GroundGravel_Concrete.png";
import dirtGround from "../assets/GroundGravel_Dirt.png";
import grassGround from "../assets/GroundGravel_Grass.png";
import sandGround from "../assets/GroundGravel_Sand.png";

// Importing outofbounds images
import concrete from "../assets/Ground_Concrete.png";
import dirt from "../assets/Ground_Dirt.png";
import grass from "../assets/Ground_Grass.png";
import sand from "../assets/Ground_Sand.png";

// Importing StorageLocation images
import beigeEndPoint from "../assets/EndPoint_Beige.png";
import blackEndPoint from "../assets/EndPoint_Black.png";
import blueEndPoint from "../assets/EndPoint_Blue.png";
import brownEndPoint from "../assets/EndPoint_Brown.png";
import grayEndPoint from "../assets/EndPoint_Gray.png";
import purpleEndPoint from "../assets/EndPoint_Purple.png";
import redEndPoint from "../assets/EndPoint_Red.png";
import yellowEndPoint from "../assets/EndPoint_Yellow.png";

// Powerups
import superStrength from "../assets/super-strength.png";
import pullingStrength from "../assets/pulling-strength.png";

import { characterImages } from "./levels";

const storageLocations = [
    beigeEndPoint,
    blackEndPoint,
    blueEndPoint,
    brownEndPoint,
    grayEndPoint,
    purpleEndPoint,
    redEndPoint,
    yellowEndPoint
];

const outOfBounds = [
    concrete,
    dirt,
    grass,
    sand
]


const groundTextures = [
    concreteGround,
    dirtGround,
    grassGround,
    sandGround
];

const crates = [
    beigeCrate,
    blackCrate,
    blueCrate,
    brownCrate,
    grayCrate,
    purpleCrate,
    redCrate,
    yellowCrate,   
];

const cratesOnStorageLocation = [
    beigeCrateStorage,
    blackCrateStorage,
    blueCrateStorage,
    brownCrateStorage,
    grayCrateStorage,
    purpleCrateStorage,
    redCrateStorage,
    yellowCrateStorage
]

const walls = [
    beigeWall,
    blackWall,
    brownWall,
    grayWall
];

export const powerUps = [
    superStrength,
    pullingStrength
]


const charImages = [ characterImages.down]

export const layout = [
    outOfBounds,
    walls,
    crates,
    groundTextures,
    storageLocations,
    cratesOnStorageLocation,
    charImages
]

const sandTheme = [
    sand,
    brownWall,
    brownCrate,
    sandGround,
    brownEndPoint,
    characterImages.down,
    brownCrateStorage
]

const dullTheme = [
    concrete,
    blackWall,
    concreteGround,
    grayCrate,
    grayEndPoint,
    characterImages.down,
    grayCrateStorage
]

const natureTheme = [
    grass,
    beigeWall,
    brownCrate,
    grassGround,
    redEndPoint,
    characterImages.down,
    brownCrateStorage
]

const vampireTheme = [
    concrete,
    blackWall,
    purpleCrate,
    sandGround,
    redEndPoint,
    characterImages.down,
    purpleCrateStorage
]

export const themes = {
    sand: sandTheme,
    dull: dullTheme,
    nature: natureTheme,
    vampire: vampireTheme,
}