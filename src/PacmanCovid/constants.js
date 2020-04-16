export const EAST = 0; // ArrowRight >
export const NORTH = 1; // ArrowUp /\
export const WEST = 2; // ArrowLeft <
export const SOUTH = 3; // ArrowDown \/

export const COMPASS = {
  NORTH: 'ArrowUp',
  SOUTH: 'ArrowDown',
  EAST: 'ArrowRight',
  WEST: 'ArrowLeft'
};

export const KEY_COMMANDS = {
  ArrowUp: NORTH,
  w: NORTH,
  W: NORTH,
  ArrowDown: SOUTH,
  s: SOUTH,
  S: SOUTH,
  ArrowRight: EAST,
  d: EAST,
  D: EAST,
  ArrowLeft: WEST,
  a: WEST,
  A: WEST
};


export const STAGE_WIDTH = 28;
export const STAGE_HEIGHT = 36;

export const PLAYER_RADIUS = 0.8;

export const WALL_COLOUR = '#0a1bc5';

export const EATING_TIME_SECONDS = 5;

export const MONSTER_SPEED_ATTACK = 5;
export const MONSTER_SPEED_RETREAT = 3;
export const PLAYER_SPEED = MONSTER_SPEED_ATTACK;

export const MONSTER_DEATH_TIME_SECONDS = 6;
export const MONSTER_HOME_RANGE = [37, 18, 8, 12];
export const MONSTER_HOME_EXIT_COL = 12.5;
