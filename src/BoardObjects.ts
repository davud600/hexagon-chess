// To hold all the global objects for pieces and board logic

import {
  type HexagonSides,
  type HexagonSlidingSides,
  type BoardType,
  type PiecesType,
} from "./types/board";
import { getBoardFromFEN } from "./utils/board/board";

export const HexagonDirections: HexagonSides = {
  north: "north",
  south: "south",
  northEast: "northEast",
  northWest: "northWest",
  southEast: "southEast",
  southWest: "southWest",
};

export const HexagonSlidingDirections: HexagonSlidingSides = {
  west: "west",
  east: "east",
  northEast: "northEast",
  northWest: "northWest",
  southEast: "southEast",
  southWest: "southWest",
};

export const Pieces: PiecesType = {
  none: 0,
  king: 1,
  pawn: 2,
  knight: 3,
  bishop: 4,
  rook: 5,
  queen: 6,

  white: 8,
  black: 16,
};

export let Board: BoardType = [];

Board = getBoardFromFEN(
  "bknrp1/qb2p2/n1b1p3/r3p4/ppppp5/11/5PPPPP/4P3R/3P1B1N/2P2BK/1PRNQB"
);
// Board = getBoardFromFEN("brnkp1/q6/8/9/10/11/10/9/8/6Q/1PKNRB");
