import {
  HexagonDirections,
  HexagonSlidingDirections,
  Pieces,
} from "~/GameObjects";
import {
  type Move,
  type BoardType,
  type PieceColor,
  type HexagonSide,
  type HexagonSlidingSide,
} from "~/types/board";
import { getPieceColor, getPieceType } from "./piece";

export function getMovesFromBoard(
  Board: BoardType,
  colorToMove: PieceColor
): Move[] {
  const moves: Move[] = [];

  for (let startPosIndex = 0; startPosIndex < 91; startPosIndex++) {
    const piece = Board[startPosIndex];

    if (piece === undefined || piece === 0) continue;
    if (getPieceColor(piece) !== colorToMove) continue;

    if (getPieceType(piece) === Pieces.rook) {
      getStraightMoves(startPosIndex, Board, piece).forEach((move) => {
        moves.push(move);
      });
    } else if (getPieceType(piece) === Pieces.bishop) {
      getSlidingMoves(startPosIndex, Board, piece).forEach((move) => {
        moves.push(move);
      });
    } else if (getPieceType(piece) === Pieces.queen) {
      getStraightMoves(startPosIndex, Board, piece).forEach((move) => {
        moves.push(move);
      });

      getSlidingMoves(startPosIndex, Board, piece).forEach((move) => {
        moves.push(move);
      });
    } else if (getPieceType(piece) === Pieces.king) {
      getStraightMoves(startPosIndex, Board, piece, 1).forEach((move) => {
        moves.push(move);
      });

      getSlidingMoves(startPosIndex, Board, piece, 1).forEach((move) => {
        moves.push(move);
      });
    } else if (getPieceType(piece) === Pieces.pawn) {
      if (getPieceColor(piece) === Pieces.white) {
        const targetPosIndex = getNeighbor(
          startPosIndex,
          HexagonDirections.north
        );
        const targetPiece = Board[targetPosIndex];

        if (targetPiece === 0) {
          moves.push({
            startPosIndex,
            targetPosIndex,
          });
        }

        const leftDiagonal = getNeighbor(
          startPosIndex,
          HexagonDirections.northWest
        );
        const rightDiagonal = getNeighbor(
          startPosIndex,
          HexagonDirections.northEast
        );

        const leftDiagonalPiece = Board[leftDiagonal];
        if (leftDiagonalPiece !== undefined && leftDiagonalPiece !== 0) {
          if (getPieceColor(leftDiagonalPiece) !== getPieceColor(piece)) {
            moves.push({ startPosIndex, targetPosIndex: leftDiagonal });
          }
        }

        const rightDiagonalPiece = Board[rightDiagonal];
        if (rightDiagonalPiece !== undefined && rightDiagonalPiece !== 0) {
          if (getPieceColor(rightDiagonalPiece) !== getPieceColor(piece)) {
            moves.push({ startPosIndex, targetPosIndex: rightDiagonal });
          }
        }
      } else {
        const targetPosIndex = getNeighbor(
          startPosIndex,
          HexagonDirections.south
        );
        const targetPiece = Board[targetPosIndex];

        if (targetPiece === 0) {
          moves.push({
            startPosIndex,
            targetPosIndex,
          });
        }

        const leftDiagonal = getNeighbor(
          startPosIndex,
          HexagonDirections.southEast
        );
        const rightDiagonal = getNeighbor(
          startPosIndex,
          HexagonDirections.southWest
        );

        const leftDiagonalPiece = Board[leftDiagonal];
        if (leftDiagonalPiece !== undefined && leftDiagonalPiece !== 0) {
          if (getPieceColor(leftDiagonalPiece) !== getPieceColor(piece)) {
            moves.push({ startPosIndex, targetPosIndex: leftDiagonal });
          }
        }

        const rightDiagonalPiece = Board[rightDiagonal];
        if (rightDiagonalPiece !== undefined && rightDiagonalPiece !== 0) {
          if (getPieceColor(rightDiagonalPiece) !== getPieceColor(piece)) {
            moves.push({ startPosIndex, targetPosIndex: rightDiagonal });
          }
        }
      }
    }
  }

  return moves;
}

function getStraightMoves(
  startPosIndex: number,
  Board: BoardType,
  piece: number,
  neighborInDirectionLimit = 11
): Move[] {
  const moves: Move[] = [];

  for (const direction in HexagonDirections) {
    let targetPosIndex = startPosIndex;
    fileLoop: for (let i = 0; i < neighborInDirectionLimit; i++) {
      targetPosIndex = getNeighbor(
        targetPosIndex,
        direction as unknown as HexagonSide
      );

      if (targetPosIndex < 0) break fileLoop;

      if (Board[targetPosIndex] !== 0) {
        if (
          getPieceColor(Board[targetPosIndex] as unknown as PieceColor) !==
          getPieceColor(piece)
        ) {
          moves.push({ startPosIndex, targetPosIndex });
        }

        break;
      }

      moves.push({ startPosIndex, targetPosIndex });
    }
  }

  return moves;
}

function getSlidingMoves(
  startPosIndex: number,
  Board: BoardType,
  piece: number,
  neighborInDirectionLimit = 11
): Move[] {
  const moves: Move[] = [];

  for (const direction in HexagonSlidingDirections) {
    let targetPosIndex = startPosIndex;
    fileLoop: for (let i = 0; i < neighborInDirectionLimit; i++) {
      targetPosIndex = getSlidingNeighbor(
        targetPosIndex,
        direction as unknown as HexagonSlidingSide
      );

      if (targetPosIndex < 0) break fileLoop;

      if (Board[targetPosIndex] !== 0) {
        if (
          getPieceColor(Board[targetPosIndex] as unknown as PieceColor) !==
          getPieceColor(piece)
        ) {
          moves.push({ startPosIndex, targetPosIndex });
        }

        break;
      }

      moves.push({ startPosIndex, targetPosIndex });
    }
  }

  return moves;
}

function getNeighbor(posIndex: number, direction: HexagonSide): number {
  let targetPosIndex = posIndex;

  switch (direction) {
    case HexagonDirections.north:
      targetPosIndex =
        posIndex -
        Math.max(
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex)),
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex) - 1)
        );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) + 1
        ? targetPosIndex
        : -1;

    case HexagonDirections.south:
      targetPosIndex =
        posIndex +
        Math.max(
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex)),
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex) + 1)
        );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.northEast:
      targetPosIndex =
        posIndex -
        Math.min(
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex)),
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex) - 1)
        );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.northWest:
      targetPosIndex = posIndex - 1;

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex)
        ? targetPosIndex
        : -1;
    case HexagonDirections.southEast:
      targetPosIndex = posIndex + 1;

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex)
        ? targetPosIndex
        : -1;
    case HexagonDirections.southWest:
      targetPosIndex =
        posIndex +
        Math.min(
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex)),
          getNumOfColsOfRow(getTopRightRowFromIndex(posIndex) + 1)
        );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    default:
      return 0;
  }
}

function getSlidingNeighbor(
  posIndex: number,
  direction: HexagonSlidingSide
): number {
  let targetPosIndex = posIndex;

  switch (direction) {
    case HexagonSlidingDirections.west:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.northWest),
        HexagonDirections.southWest
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) - 1
        ? targetPosIndex
        : -1;

    case HexagonSlidingDirections.east:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.northEast),
        HexagonDirections.southEast
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonSlidingDirections.northEast:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.north),
        HexagonDirections.northEast
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) + 2
        ? targetPosIndex
        : -1;
    case HexagonDirections.northWest:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.north),
        HexagonDirections.northWest
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.southEast:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.south),
        HexagonDirections.southEast
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.southWest:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.south),
        HexagonDirections.southWest
      );

      return getTopRightRowFromIndex(posIndex) ===
        getTopRightRowFromIndex(targetPosIndex) - 2
        ? targetPosIndex
        : -1;
    default:
      return 0;
  }
}

function getTopRightRowFromIndex(posIndex: number): number {
  let row = 0;

  if (posIndex >= 6 && posIndex <= 12) row = 1;
  else if (posIndex >= 13 && posIndex <= 20) row = 2;
  else if (posIndex >= 21 && posIndex <= 29) row = 3;
  else if (posIndex >= 30 && posIndex <= 39) row = 4;
  else if (posIndex >= 40 && posIndex <= 50) row = 5;
  else if (posIndex >= 51 && posIndex <= 60) row = 6;
  else if (posIndex >= 61 && posIndex <= 69) row = 7;
  else if (posIndex >= 70 && posIndex <= 77) row = 8;
  else if (posIndex >= 78 && posIndex <= 84) row = 9;
  else if (posIndex >= 85 && posIndex <= 90) row = 10;

  return row;
}

function getNumOfColsOfRow(row: number): number {
  let numOfCols = 0;

  if (row <= 0) numOfCols = 6;
  else if (row === 1) numOfCols = 7;
  else if (row === 2) numOfCols = 8;
  else if (row === 3) numOfCols = 9;
  else if (row === 4) numOfCols = 10;
  else if (row === 5) numOfCols = 11;
  else if (row === 6) numOfCols = 10;
  else if (row === 7) numOfCols = 9;
  else if (row === 8) numOfCols = 8;
  else if (row === 9) numOfCols = 7;
  else if (row >= 10) numOfCols = 6;

  return numOfCols;
}

export function movesIncludeMove(moves: Move[], move: Move): boolean {
  let movesIncludeMove = false;

  moves.forEach((item) => {
    if (
      item.startPosIndex === move.startPosIndex &&
      item.targetPosIndex === move.targetPosIndex
    )
      movesIncludeMove = true;
  });

  return movesIncludeMove;
}

export function getBoardFromFEN(FEN: string): BoardType {
  const updatedBoard: number[] = [];
  updatedBoard.length = 91;
  updatedBoard.fill(0);

  let row = 0;
  let col = 0;

  for (let i = 0; i < FEN.length; i++) {
    // Finding board index
    if (FEN[i] === "/") {
      row++;
      col = 0;
      continue;
    }
    if (!!parseInt(FEN[i] as unknown as string)) {
      col += parseInt(FEN[i] as unknown as string);
      continue;
    }

    let posIndex = 0;

    if (row === 0) {
    } else if (row === 1) {
      posIndex += 6 * row;
    } else if (row === 2) {
      posIndex += 7 * row - 1;
    } else if (row === 3) {
      posIndex += 8 * row - 3;
    } else if (row === 4) {
      posIndex += 9 * row - 6;
    } else if (row === 5) {
      posIndex += 10 * row - 10;
    } else if (row === 6) {
      posIndex += 11 * row - 15;
    } else if (row === 7) {
      posIndex += 10 * row - 9;
    } else if (row === 8) {
      posIndex += 9 * row - 2;
    } else if (row === 9) {
      posIndex += 8 * row + 6;
    } else if (row === 10) {
      posIndex += 7 * row + 15;
    } else if (row === 10) {
      posIndex += 6 * row;
    }

    posIndex += col;

    // Determining Type of piece
    switch (FEN[i]?.toLowerCase()) {
      case "k":
        updatedBoard[posIndex] += Pieces.king;
        break;
      case "q":
        updatedBoard[posIndex] += Pieces.queen;
        break;
      case "r":
        updatedBoard[posIndex] += Pieces.rook;
        break;
      case "b":
        updatedBoard[posIndex] += Pieces.bishop;
        break;
      case "n":
        updatedBoard[posIndex] += Pieces.knight;
        break;
      case "p":
        updatedBoard[posIndex] += Pieces.pawn;
        break;
      default:
        updatedBoard[posIndex] = 0;
        continue;
    }

    // Determining Color of piece
    updatedBoard[posIndex] +=
      FEN[i] === FEN[i]?.toUpperCase() ? Pieces.white : Pieces.black;

    col++;
  }

  return updatedBoard;
}
