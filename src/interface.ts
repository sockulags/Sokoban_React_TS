export interface IHighscore {
  name: string;
  points: number;
}

export interface IPosition {
  x: number;
  y: number;
}

export type Direction = "up" | "down" | "left" | "right";

export interface ICharDirection {
  [key: string]: { direction: Direction; deltaY: number; deltaX: number };
}

export type PlayMode = "normal" | "powerups" | "custom";