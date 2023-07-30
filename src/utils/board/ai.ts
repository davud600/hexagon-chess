import { type BoardType, type PieceColor, type Move } from "~/types/board";
import { getFenFromBoard, getGameResult } from "./board";
import { getOppositeColor } from "./piece";
import { getLegalMovesFromBoard } from "./moves";

export function aiGetMove(
  moves: Move[],
  board: BoardType,
  aiColor: PieceColor
): Move | undefined {
  // keep track of highest score move and it's score
  let bestMove: Move = moves[0] as unknown as Move;
  let bestScore = -100;

  // make each move in moves
  moves.forEach((move) => {
    const updatedBoard = generateMove(move, board);
    console.log(getFenFromBoard(updatedBoard))
    console.log(getFenFromBoard(board))

    // check it's result
    const moveScore = getScoreOfBoard(updatedBoard, aiColor);
    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMove = { ...move };
    }
  });

  return bestMove;
}

function getScoreOfBoard(board: BoardType, color: PieceColor): number {
  const gameResult = getGameResult(
    board,
    getOppositeColor(color),
    getLegalMovesFromBoard(board, getOppositeColor(color))
  );

  // If game ended check result
  if (gameResult === 0) return 0;
  else if (gameResult === color) return 100;
  else if (gameResult === getOppositeColor(color)) return -100;

  // If game hasn't ended check scores by counting pieces of each color
  return getScoreOfBoard(board, color);
}

function generateMove(move: Move, board: BoardType): BoardType {
  const updatedBoard = [...board];
  updatedBoard[move.startPosIndex] = 0;
  updatedBoard[move.targetPosIndex] = board[
    move.startPosIndex
  ] as unknown as number;

  return updatedBoard;
}
