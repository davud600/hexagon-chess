import { BoardType, PieceColor, type Move } from "~/types/board";
import { getGameResult } from "./board";
import { getMovesFromBoard } from "./moves";
import { getOppositeColor } from "./piece";

export function aiGetMove(
  moves: Move[],
  board: BoardType,
  aiColor: PieceColor
): Move | undefined {
  // const randomTargetIndex = Math.floor(Math.random() * moves.length);

  // const move: Move | undefined = moves[randomTargetIndex];

  // keep track of highest score move and it's score
  let bestMove: Move = moves[0] as unknown as Move;
  let bestScore = -10;

  // make each move in moves
  moves.forEach((move) => {
    const updatedBoard = generateMove(move, board);

    // check it's result
    const moveScore = getScoreOfBoard(board, getOppositeColor(aiColor));
    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMove = { ...move };
    }
  });

  console.log({ bestMove, bestScore });

  return bestMove;
}

function getScoreOfBoard(board: BoardType, colorToMove: PieceColor): number {
  const gameResult = getGameResult(
    board,
    colorToMove,
    getMovesFromBoard(board, colorToMove)
  );

  if (gameResult === 0 || gameResult === 1) return 0;

  if (gameResult === colorToMove) return 10;

  return -10;
}

function generateMove(move: Move, board: BoardType): BoardType {
  const updatedBoard = [...board];
  updatedBoard[move.startPosIndex] = 0;
  updatedBoard[move.startPosIndex] = board[
    move.startPosIndex
  ] as unknown as number;

  return updatedBoard;
}
