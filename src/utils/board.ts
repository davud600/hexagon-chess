import { Pieces } from "~/GameObjects";

export function getBoardFromFEN(FEN: string) {
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
