export type ModuleColor = "light" | "neutral" | "dark";

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

export type SelectedPieceType = {
  pieceValue: number;
  posIndex: number;
};

export type Move = {
  startPosIndex: number;
  targetPosIndex: number;
};

export type BoardType = number[];

export type HexagonSide =
  | "north"
  | "south"
  | "northEast"
  | "northWest"
  | "southEast"
  | "southWest";

export type HexagonSides = {
  north: HexagonSide;
  south: HexagonSide;
  northEast: HexagonSide;
  northWest: HexagonSide;
  southEast: HexagonSide;
  southWest: HexagonSide;
};

export type HexagonSlidingSide =
  | "west"
  | "east"
  | "northEast"
  | "northWest"
  | "southEast"
  | "southWest";

export type HexagonSlidingSides = {
  west: HexagonSlidingSide;
  east: HexagonSlidingSide;
  northEast: HexagonSlidingSide;
  northWest: HexagonSlidingSide;
  southEast: HexagonSlidingSide;
  southWest: HexagonSlidingSide;
};
