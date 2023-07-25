import {
  type PieceColor,
  type BoardType,
  type Move,
  type HexagonSlidingSide,
  type HexagonSide,
} from "~/types/board";
import { getPieceColor, getPieceType } from "./piece";
import {
  HexagonDirections,
  HexagonSlidingDirections,
  Pieces,
} from "~/BoardObjects";
import { getNeighbor, getSlidingNeighbor, isInCheck } from "./board";

export function getLegalMovesFromBoard(
  Board: BoardType,
  colorToMove: PieceColor
): Move[] {
  const moves: Move[] = [];

  getMovesFromBoard(Board, colorToMove).forEach((pseudoLegalMove) => {
    let moveIsLegal = true;

    // make move and get new board
    const updatedBoard = [...Board];
    updatedBoard[pseudoLegalMove.startPosIndex] = 0;
    updatedBoard[pseudoLegalMove.targetPosIndex] = Board[
      pseudoLegalMove.startPosIndex
    ] as unknown as number;

    moveIsLegal = !isInCheck(updatedBoard, colorToMove);

    if (moveIsLegal) {
      moves.push({ ...pseudoLegalMove });
    }
  });

  return moves;
}

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
        const firstDirectionTarget = getNeighbor(
          startPosIndex,
          direction as unknown as HexagonSide
        );

        if (firstDirectionTarget < 0) continue;

        const directionTarget = getNeighbor(
          firstDirectionTarget,
          direction as unknown as HexagonSide
        );

        if (directionTarget < 0) continue;

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

        if (firstTarget !== undefined) {
          if (
            firstTarget === 0 ||
            (firstTarget !== 0 &&
              getPieceColor(firstTarget) !== getPieceColor(piece))
          ) {
            moves.push({ startPosIndex, targetPosIndex: firstTargetPosIndex });
          }
        }

        if (secondTarget !== undefined) {
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
