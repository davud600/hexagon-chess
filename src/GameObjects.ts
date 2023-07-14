// To hold all the global objects for pieces and board logic

import { type PiecesType } from "./types/board";

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

export const Board: number[] = [];

Board.length = 91;
Board.fill(0);

Board[0] = Pieces.king | Pieces.white;
Board[1] = Pieces.rook | Pieces.white;
Board[10] = Pieces.knight | Pieces.white;
Board[56] = Pieces.pawn | Pieces.black;
Board[77] = Pieces.queen | Pieces.black;
