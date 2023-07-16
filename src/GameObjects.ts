// To hold all the global objects for pieces and board logic

import { type BoardType, type PiecesType } from "./types/board";
import { getBoardFromFEN } from "./utils/board";

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

// Board = getBoardFromFEN(
//   "bknrp1/qb2p2/n1b1p3/r3p4/ppppp5/11/5PPPPP/4P3R/3P1B1N/2P2BK/1PRNQB"
// );
Board = getBoardFromFEN("6/7/8/4R4/10/11/7r2/9/8/7/6");
