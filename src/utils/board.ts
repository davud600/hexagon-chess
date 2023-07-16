import { Pieces } from "~/GameObjects";
import {
  type Move,
  type BoardType,
  type PieceColor,
  type PieceIndex,
} from "~/types/board";

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
      const topRightRow = getTopRightRowFromIndex(startPosIndex);
      const topLeftRow = getTopLeftRowFromIndex(startPosIndex);
      const rightRow = getRightRowFromIndex(startPosIndex);

      // North West
      for (let i = 1; i <= 11; i++) {
        if (getTopRightRowFromIndex(startPosIndex + i) !== topRightRow) break;
        if (Board[startPosIndex + i] !== 0) {
          if (
            getPieceColor(Board[startPosIndex + i] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: startPosIndex + i });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: startPosIndex + i });
      }

      // South East
      for (let i = 1; i <= 11; i++) {
        if (getTopRightRowFromIndex(startPosIndex - i) !== topRightRow) break;
        if (Board[startPosIndex - i] !== 0) {
          if (
            getPieceColor(Board[startPosIndex - i] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: startPosIndex - i });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: startPosIndex - i });
      }

      // North East
      let targetPosIndexNe = startPosIndex;
      for (let i = 1; i <= 11; i++) {
        targetPosIndexNe -= Math.min(
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexNe) - 1),
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexNe))
        );

        if (getTopLeftRowFromIndex(targetPosIndexNe) !== topLeftRow) break;
        if (Board[targetPosIndexNe] !== 0) {
          if (
            getPieceColor(Board[targetPosIndexNe] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: targetPosIndexNe });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: targetPosIndexNe });
      }

      // South West
      let targetPosIndexSw = startPosIndex;
      for (let i = 1; i <= 11; i++) {
        if (getTopRightRowFromIndex(targetPosIndexSw) > 11) break;

        targetPosIndexSw += Math.min(
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexSw)),
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexSw) + 1)
        );

        if (getTopLeftRowFromIndex(targetPosIndexSw) !== topLeftRow) break;
        if (Board[targetPosIndexSw] !== 0) {
          if (
            getPieceColor(Board[targetPosIndexSw] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: targetPosIndexSw });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: targetPosIndexSw });
      }

      // South
      let targetPosIndexS = startPosIndex;
      for (let i = 1; i <= 11; i++) {
        targetPosIndexS +=
          Math.min(
            getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexS)),
            getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexS) + 1)
          ) + 1;

        if (getRightRowFromIndex(targetPosIndexS) !== rightRow) break;
        if (Board[targetPosIndexS] !== 0) {
          if (
            getPieceColor(Board[targetPosIndexS] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: targetPosIndexS });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: targetPosIndexS });
      }

      // North
      let targetPosIndexN = startPosIndex;
      for (let i = 1; i <= 11; i++) {
        targetPosIndexN -= Math.max(
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexN)),
          getNumOfColsOfRow(getTopRightRowFromIndex(targetPosIndexN) - 1)
        );

        if (getRightRowFromIndex(targetPosIndexN) !== rightRow) break;
        if (Board[targetPosIndexN] !== 0) {
          if (
            getPieceColor(Board[targetPosIndexN] as unknown as number) !==
            getPieceColor(piece)
          ) {
            moves.push({ startPosIndex, targetPosIndex: targetPosIndexN });
          }

          break;
        }

        moves.push({ startPosIndex, targetPosIndex: targetPosIndexN });
      }
    }
  }

  return moves;
}

export function getPieceColor(pieceValue: number): PieceColor {
  const bin = (pieceValue >>> 0).toString(2);

  return bin.length === 4 ? 8 : 16;
}

export function getPieceType(pieceValue: number): PieceIndex {
  const bin = (pieceValue >>> 0).toString(2);

  const pieceIndex = parseInt(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${bin[bin.length - 3]}${bin[bin.length - 2]}${bin[bin.length - 1]}`,
    2
  );

  if (pieceIndex > 6 || pieceIndex < 0) return 0;

  return pieceIndex as unknown as PieceIndex;
}

export function getTopRightRowFromIndex(posIndex: number): number {
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

export function getTopLeftRowFromIndex(posIndex: number): number {
  let row = 0;

  if (
    posIndex === 51 ||
    posIndex === 41 ||
    posIndex === 31 ||
    posIndex === 22 ||
    posIndex === 14 ||
    posIndex === 7 ||
    posIndex === 1
  )
    row = 1;
  else if (
    posIndex === 61 ||
    posIndex === 52 ||
    posIndex === 42 ||
    posIndex === 32 ||
    posIndex === 23 ||
    posIndex === 15 ||
    posIndex === 8 ||
    posIndex === 2
  )
    row = 2;
  else if (
    posIndex === 70 ||
    posIndex === 62 ||
    posIndex === 53 ||
    posIndex === 43 ||
    posIndex === 33 ||
    posIndex === 24 ||
    posIndex === 16 ||
    posIndex === 9 ||
    posIndex === 3
  )
    row = 3;
  else if (
    posIndex === 78 ||
    posIndex === 71 ||
    posIndex === 63 ||
    posIndex === 54 ||
    posIndex === 44 ||
    posIndex === 34 ||
    posIndex === 25 ||
    posIndex === 17 ||
    posIndex === 10 ||
    posIndex === 4
  )
    row = 4;
  else if (
    posIndex === 85 ||
    posIndex === 79 ||
    posIndex === 72 ||
    posIndex === 64 ||
    posIndex === 55 ||
    posIndex === 45 ||
    posIndex === 35 ||
    posIndex === 26 ||
    posIndex === 18 ||
    posIndex === 11 ||
    posIndex === 5
  )
    row = 5;
  else if (
    posIndex === 86 ||
    posIndex === 80 ||
    posIndex === 73 ||
    posIndex === 65 ||
    posIndex === 56 ||
    posIndex === 46 ||
    posIndex === 36 ||
    posIndex === 27 ||
    posIndex === 19 ||
    posIndex === 12
  )
    row = 6;
  else if (
    posIndex === 87 ||
    posIndex === 81 ||
    posIndex === 74 ||
    posIndex === 66 ||
    posIndex === 57 ||
    posIndex === 47 ||
    posIndex === 37 ||
    posIndex === 28 ||
    posIndex === 20
  )
    row = 7;
  else if (
    posIndex === 88 ||
    posIndex === 82 ||
    posIndex === 75 ||
    posIndex === 67 ||
    posIndex === 58 ||
    posIndex === 48 ||
    posIndex === 38 ||
    posIndex === 29
  )
    row = 8;
  else if (
    posIndex === 89 ||
    posIndex === 83 ||
    posIndex === 76 ||
    posIndex === 68 ||
    posIndex === 59 ||
    posIndex === 49 ||
    posIndex === 39
  )
    row = 9;
  else if (
    posIndex === 90 ||
    posIndex === 84 ||
    posIndex === 77 ||
    posIndex === 69 ||
    posIndex === 60 ||
    posIndex === 50
  )
    row = 10;

  return row;
}

export function getRightRowFromIndex(posIndex: number): number {
  let row = 0;

  if (
    posIndex === 4 ||
    posIndex === 11 ||
    posIndex === 19 ||
    posIndex === 28 ||
    posIndex === 38 ||
    posIndex === 49 ||
    posIndex === 60
  )
    row = 1;
  else if (
    posIndex === 3 ||
    posIndex === 10 ||
    posIndex === 18 ||
    posIndex === 27 ||
    posIndex === 37 ||
    posIndex === 48 ||
    posIndex === 59 ||
    posIndex === 69
  )
    row = 2;
  else if (
    posIndex === 2 ||
    posIndex === 9 ||
    posIndex === 17 ||
    posIndex === 26 ||
    posIndex === 36 ||
    posIndex === 47 ||
    posIndex === 58 ||
    posIndex === 68 ||
    posIndex === 77
  )
    row = 3;
  else if (
    posIndex === 1 ||
    posIndex === 8 ||
    posIndex === 16 ||
    posIndex === 25 ||
    posIndex === 35 ||
    posIndex === 46 ||
    posIndex === 57 ||
    posIndex === 67 ||
    posIndex === 76 ||
    posIndex === 84
  )
    row = 4;
  else if (
    posIndex === 0 ||
    posIndex === 7 ||
    posIndex === 15 ||
    posIndex === 24 ||
    posIndex === 34 ||
    posIndex === 45 ||
    posIndex === 56 ||
    posIndex === 66 ||
    posIndex === 75 ||
    posIndex === 83 ||
    posIndex === 90
  )
    row = 5;
  else if (
    posIndex === 6 ||
    posIndex === 14 ||
    posIndex === 23 ||
    posIndex === 33 ||
    posIndex === 44 ||
    posIndex === 55 ||
    posIndex === 65 ||
    posIndex === 74 ||
    posIndex === 82 ||
    posIndex === 89
  )
    row = 6;
  else if (
    posIndex === 13 ||
    posIndex === 22 ||
    posIndex === 32 ||
    posIndex === 43 ||
    posIndex === 54 ||
    posIndex === 64 ||
    posIndex === 73 ||
    posIndex === 81 ||
    posIndex === 88
  )
    row = 7;
  else if (
    posIndex === 21 ||
    posIndex === 31 ||
    posIndex === 42 ||
    posIndex === 53 ||
    posIndex === 64 ||
    posIndex === 72 ||
    posIndex === 80 ||
    posIndex === 87
  )
    row = 8;
  else if (
    posIndex === 30 ||
    posIndex === 41 ||
    posIndex === 52 ||
    posIndex === 62 ||
    posIndex === 71 ||
    posIndex === 79 ||
    posIndex === 86
  )
    row = 9;
  else if (
    posIndex === 40 ||
    posIndex === 51 ||
    posIndex === 61 ||
    posIndex === 70 ||
    posIndex === 78 ||
    posIndex === 85
  )
    row = 10;

  return row;
}

export function getNumOfColsOfRow(row: number): number {
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
