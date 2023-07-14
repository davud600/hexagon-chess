export type PieceIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type PieceColor = 8 | 16;

export type PiecesType = {
  none: PieceIndex;
  king: PieceIndex;
  pawn: PieceIndex;
  knight: PieceIndex;
  bishop: PieceIndex;
  rook: PieceIndex;
  queen: PieceIndex;

  white: PieceColor;
  black: PieceColor;
};

export type BoardType = number[];
