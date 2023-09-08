import {
  HexagonDirections,
  HexagonSlidingDirections,
  Pieces,
} from "~/BoardObjects";
import {
  type Move,
  type BoardType,
  type HexagonSide,
  type HexagonSlidingSide,
  type PieceColor,
  type GameResultType,
} from "~/types/board";
import { getMovesFromBoard } from "./moves";
import {
  getOppositeColor,
  getPieceColor,
  getPieceScoreValue,
  getPieceType,
} from "./piece";

export function getScore(color: PieceColor, board: BoardType): number {
  let score = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === undefined || board[i] === 0) continue;
    if (getPieceColor(board[i] as unknown as number) === color) {
      score += getPieceScoreValue(board[i] as unknown as number);
    }
  }

  return score;
}

export function getGameResult(
  board: BoardType,
  colorToMove: PieceColor,
  moves: Move[]
): GameResultType {
  let result: GameResultType = 0; // stalemate

  if (moves.length !== 0) return 1;

  if (isInCheck(board, colorToMove)) {
    result = getOppositeColor(colorToMove);
  }

  return result;
}

export function isInCheck(
  board: BoardType,
  colorToMove: PieceColor,
  kingPosIndex?: number
): boolean {
  let isInCheck = false;

  // find king
  if (kingPosIndex === undefined) {
    kingPosIndex = 0;
    for (let i = 0; i < 91; i++) {
      if (
        getPieceType(board[i] as unknown as number) === Pieces.king &&
        getPieceColor(board[i] as unknown as number) === colorToMove
      ) {
        kingPosIndex = i;
      }
    }
  }

  // check if any of the move.targetPosition is the same as the posIndex for the king
  const moves = getMovesFromBoard(board, getOppositeColor(colorToMove));
  for (let i = 0; i < moves.length; i++) {
    if (moves[i]?.targetPosIndex === kingPosIndex) {
      isInCheck = true;
      break;
    }
  }

  return isInCheck;
}

export function getNeighbor(posIndex: number, direction: HexagonSide): number {
  let targetPosIndex = posIndex;

  switch (direction) {
    case HexagonDirections.north:
      targetPosIndex =
        posIndex -
        Math.max(
          getNumOfRanksOfFile(getFileFromPos(posIndex)),
          getNumOfRanksOfFile(getFileFromPos(posIndex) - 1)
        );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) + 1
        ? targetPosIndex
        : -1;

    case HexagonDirections.south:
      targetPosIndex =
        posIndex +
        Math.max(
          getNumOfRanksOfFile(getFileFromPos(posIndex)),
          getNumOfRanksOfFile(getFileFromPos(posIndex) + 1)
        );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.northEast:
      targetPosIndex =
        posIndex -
        Math.min(
          getNumOfRanksOfFile(getFileFromPos(posIndex)),
          getNumOfRanksOfFile(getFileFromPos(posIndex) - 1)
        );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.northWest:
      targetPosIndex = posIndex - 1;

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex)
        ? targetPosIndex
        : -1;
    case HexagonDirections.southEast:
      targetPosIndex = posIndex + 1;

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex)
        ? targetPosIndex
        : -1;
    case HexagonDirections.southWest:
      targetPosIndex =
        posIndex +
        Math.min(
          getNumOfRanksOfFile(getFileFromPos(posIndex)),
          getNumOfRanksOfFile(getFileFromPos(posIndex) + 1)
        );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    default:
      return 0;
  }
}

export function getSlidingNeighbor(
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

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) - 1
        ? targetPosIndex
        : -1;

    case HexagonSlidingDirections.east:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.northEast),
        HexagonDirections.southEast
      );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonSlidingDirections.northEast:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.north),
        HexagonDirections.northEast
      );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) + 2
        ? targetPosIndex
        : -1;
    case HexagonDirections.northWest:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.north),
        HexagonDirections.northWest
      );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) + 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.southEast:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.south),
        HexagonDirections.southEast
      );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) - 1
        ? targetPosIndex
        : -1;
    case HexagonDirections.southWest:
      targetPosIndex = getNeighbor(
        getNeighbor(targetPosIndex, HexagonDirections.south),
        HexagonDirections.southWest
      );

      return getFileFromPos(posIndex) === getFileFromPos(targetPosIndex) - 2
        ? targetPosIndex
        : -1;
    default:
      return 0;
  }
}

export function movesIncludeMove(moves: Move[], move: Move): boolean {
  let movesIncludeMove = false;

  for (let i = 0; i < moves.length; i++) {
    if (
      moves[i]?.startPosIndex === move.startPosIndex &&
      moves[i]?.targetPosIndex === move.targetPosIndex
    )
      movesIncludeMove = true;
  }

  return movesIncludeMove;
}

export function getFenFromBoard(board: BoardType): string {
  let fen = "";

  for (let file = 0; file < 11; file++) {
    let emptyModules = 0;
    for (let rank = 0; rank < getNumOfRanksOfFile(file); rank++) {
      let pieceToAdd = "";

      if (board[getPosFromFileAndRank(file, rank)] === 0) {
        emptyModules++;
      } else {
        if (emptyModules > 0) {
          fen += emptyModules.toString();
          emptyModules = 0;
        }

        if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.pawn
        ) {
          pieceToAdd = "p";
        } else if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.king
        ) {
          pieceToAdd = "k";
        } else if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.bishop
        ) {
          pieceToAdd = "b";
        } else if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.knight
        ) {
          pieceToAdd = "n";
        } else if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.queen
        ) {
          pieceToAdd = "q";
        } else if (
          getPieceType(
            board[getPosFromFileAndRank(file, rank)] as unknown as number
          ) === Pieces.rook
        ) {
          pieceToAdd = "r";
        }
      }

      pieceToAdd =
        getPieceColor(
          board[getPosFromFileAndRank(file, rank)] as unknown as number
        ) === Pieces.white
          ? pieceToAdd.toUpperCase()
          : pieceToAdd.toLowerCase();

      fen += pieceToAdd;

      if (rank === getNumOfRanksOfFile(file) - 1) {
        if (emptyModules > 0) {
          fen += emptyModules.toString();
          emptyModules = 0;
        }

        if (file < 10) {
          fen += "/";
        }
      }
    }
  }

  return fen;
}

export function getBoardFromFEN(FEN: string): BoardType {
  const updatedBoard: number[] = [];
  updatedBoard.length = 91;
  updatedBoard.fill(0);

  let file = 0;
  let rank = 0;

  for (let i = 0; i < FEN.length; i++) {
    // Finding board index
    if (FEN[i] === "/") {
      file++;
      rank = 0;
      continue;
    }
    if (!!parseInt(FEN[i] as unknown as string)) {
      rank += parseInt(FEN[i] as unknown as string);
      continue;
    }

    const posIndex = getPosFromFileAndRank(file, rank);

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

    rank++;
  }

  return updatedBoard;
}

function getPosFromFileAndRank(file: number, rank: number): number {
  let posIndex = 0;

  if (file === 1) {
    posIndex += 6 * file;
  } else if (file === 2) {
    posIndex += 7 * file - 1;
  } else if (file === 3) {
    posIndex += 8 * file - 3;
  } else if (file === 4) {
    posIndex += 9 * file - 6;
  } else if (file === 5) {
    posIndex += 10 * file - 10;
  } else if (file === 6) {
    posIndex += 11 * file - 15;
  } else if (file === 7) {
    posIndex += 10 * file - 9;
  } else if (file === 8) {
    posIndex += 9 * file - 2;
  } else if (file === 9) {
    posIndex += 8 * file + 6;
  } else if (file === 10) {
    posIndex += 7 * file + 15;
  } else if (file === 10) {
    posIndex += 6 * file;
  }

  posIndex += rank;

  return posIndex;
}

function getFileFromPos(posIndex: number): number {
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

function getNumOfRanksOfFile(row: number): number {
  let numOfCols = 0;

  if (row === 0) numOfCols = 6;
  else if (row === 1) numOfCols = 7;
  else if (row === 2) numOfCols = 8;
  else if (row === 3) numOfCols = 9;
  else if (row === 4) numOfCols = 10;
  else if (row === 5) numOfCols = 11;
  else if (row === 6) numOfCols = 10;
  else if (row === 7) numOfCols = 9;
  else if (row === 8) numOfCols = 8;
  else if (row === 9) numOfCols = 7;
  else if (row === 10) numOfCols = 6;

  return numOfCols;
}