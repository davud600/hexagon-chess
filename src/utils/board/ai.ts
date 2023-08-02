import { type BoardType, type PieceColor, type Move } from "~/types/board";
import { getGameResult, getScore } from "./board";
import { getOppositeColor } from "./piece";
import { getLegalMovesFromBoard } from "./moves";

function minmax(
  board: BoardType,
  color: PieceColor,
  depth: number,
  aiColor: PieceColor
): number {
  const isMaximizing = color === aiColor;
  const MAX_DEPTH = 2;
  const MAX_SCORE = isMaximizing ? 100 : -100;
  const MIN_SCORE = -MAX_SCORE;
  const moves = getLegalMovesFromBoard(board, color);
  const oppositeColor = getOppositeColor(color);
  const gameResult = getGameResult(board, color, moves);

  // If game ended return score
  if (gameResult === 0) return 0;
  else if (gameResult === color) return MAX_SCORE;
  else if (gameResult === oppositeColor) return MIN_SCORE;

  // If game hasn't ended but depth is at maximum,
  // check scores by counting pieces of each color
  if (depth >= MAX_DEPTH) {
    return isMaximizing
      ? getScore(color, board) - getScore(oppositeColor, board)
      : getScore(oppositeColor, board) - getScore(color, board);
  }

  // keep track of highest score move and it's score
  let bestScore = MIN_SCORE;

  // make each move in moves
  for (let i = 0; i < moves.length; i++) {
    const updatedBoard = generateMove(moves[i] as unknown as Move, board);
    const moveScore = minmax(updatedBoard, oppositeColor, depth + 1, aiColor);
    console.log({ moveScore, depth, isMaximizing });

    bestScore = isMaximizing
      ? Math.max(moveScore, bestScore)
      : Math.min(moveScore, bestScore);
  }

  return isMaximizing ? bestScore - depth : bestScore + depth;
}

export function aiGetMove(
  moves: Move[],
  board: BoardType,
  aiColor: PieceColor
): Move | undefined {
  // keep track of highest score move and it's score
  let bestMove: Move = moves[0] as unknown as Move;
  let bestScore = -100;

  // make each move in moves
  for (let i = 0; i < moves.length; i++) {
    const updatedBoard = generateMove(moves[i] as unknown as Move, board);

    // check it's score
    const moveScore = minmax(
      updatedBoard,
      getOppositeColor(aiColor),
      1,
      aiColor
    );
    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMove = { ...(moves[i] as unknown as Move) };
    } else if (moveScore === bestScore) {
      if (Math.random() >= 0.5) {
        bestScore = moveScore;
        bestMove = { ...(moves[i] as unknown as Move) };
      }
    }
  }

  console.log({ bestMove, bestScore });

  return bestMove;
}

function generateMove(move: Move, board: BoardType): BoardType {
  const updatedBoard = [...board];
  updatedBoard[move.startPosIndex] = 0;
  updatedBoard[move.targetPosIndex] = board[
    move.startPosIndex
  ] as unknown as number;

  return updatedBoard;
}
