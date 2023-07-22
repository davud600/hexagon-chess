import {
  HexagonDirections,
  HexagonSlidingDirections,
  Pieces,
} from "~/BoardObjects";
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

        // Second move for first play
        if (isAllowedSecondMove(startPosIndex, Pieces.white)) {
          const secondTargetPiece =
            Board[getNeighbor(targetPosIndex, HexagonDirections.north)];
          if (secondTargetPiece === 0) {
            moves.push({
              startPosIndex,
              targetPosIndex: getNeighbor(
                targetPosIndex,
                HexagonDirections.north
              ),
            });
          }
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

        // Second move for first play
        if (isAllowedSecondMove(startPosIndex, Pieces.black)) {
          const secondTargetPiece =
            Board[getNeighbor(targetPosIndex, HexagonDirections.south)];
          if (secondTargetPiece === 0) {
            moves.push({
              startPosIndex,
              targetPosIndex: getNeighbor(
                targetPosIndex,
                HexagonDirections.south
              ),
            });
          }
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
    } else if (getPieceType(piece) === Pieces.knight) {
      for (const direction in HexagonDirections) {
        const directionTarget = getNeighbor(
          getNeighbor(startPosIndex, direction as unknown as HexagonSide),
          direction as unknown as HexagonSide
        );

        let firstDirection: HexagonSide = direction as unknown as HexagonSide;
        let secondDirection: HexagonSide = direction as unknown as HexagonSide;

        if (direction === HexagonDirections.north) {
          firstDirection = HexagonDirections.northWest;
          secondDirection = HexagonDirections.northEast;
        } else if (direction === HexagonDirections.northEast) {
          firstDirection = HexagonDirections.north;
          secondDirection = HexagonDirections.southEast;
        } else if (direction === HexagonDirections.southEast) {
          firstDirection = HexagonDirections.northEast;
          secondDirection = HexagonDirections.south;
        } else if (direction === HexagonDirections.south) {
          firstDirection = HexagonDirections.southEast;
          secondDirection = HexagonDirections.southWest;
        } else if (direction === HexagonDirections.southWest) {
          firstDirection = HexagonDirections.south;
          secondDirection = HexagonDirections.northWest;
        } else if (direction === HexagonDirections.northWest) {
          firstDirection = HexagonDirections.southWest;
          secondDirection = HexagonDirections.north;
        }

        const firstTargetPosIndex = getNeighbor(
          directionTarget,
          firstDirection
        );
        const secondTargetPosIndex = getNeighbor(
          directionTarget,
          secondDirection
        );

        const firstTarget = Board[firstTargetPosIndex];
        const secondTarget = Board[secondTargetPosIndex];

        if (firstTarget === undefined || secondTarget === undefined) continue;

        if (
          firstTarget === 0 ||
          (firstTarget !== 0 &&
            getPieceColor(firstTarget) !== getPieceColor(piece))
        ) {
          moves.push({ startPosIndex, targetPosIndex: firstTargetPosIndex });
        }

        if (
          secondTarget === 0 ||
          (secondTarget !== 0 &&
            getPieceColor(secondTarget) !== getPieceColor(piece))
        ) {
          moves.push({ startPosIndex, targetPosIndex: secondTargetPosIndex });
        }
      }
    }
  }

  return moves;
}

function isAllowedSecondMove(
  startPosIndex: number,
  pieceColor: PieceColor
): boolean {
  return pieceColor === Pieces.white
    ? startPosIndex === 86 ||
        startPosIndex === 80 ||
        startPosIndex === 73 ||
        startPosIndex === 65 ||
        startPosIndex === 56 ||
        startPosIndex === 57 ||
        startPosIndex === 58 ||
        startPosIndex === 59 ||
        startPosIndex === 60
    : startPosIndex === 86 ||
        startPosIndex === 30 ||
        startPosIndex === 31 ||
        startPosIndex === 32 ||
        startPosIndex === 33 ||
        startPosIndex === 34 ||
        startPosIndex === 25 ||
        startPosIndex === 17 ||
        startPosIndex === 10 ||
        startPosIndex === 4;
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
