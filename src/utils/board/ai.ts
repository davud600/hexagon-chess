import { type Move } from "~/types/board";

export function aiGetMove(moves: Move[]): Move {
  const randomTargetIndex = Math.floor(Math.random() * moves.length);

  const move: Move = moves[randomTargetIndex] as unknown as Move;

  if (move === undefined) {
    console.log({ randomTargetIndex, moves });
  }

  return move;
}
