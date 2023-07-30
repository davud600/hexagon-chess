import { Pieces } from "~/BoardObjects";
import { type PieceColor, type PieceIndex } from "~/types/board";

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

export function getOppositeColor(color: PieceColor): PieceColor {
  return color === Pieces.black ? Pieces.white : Pieces.black;
}
