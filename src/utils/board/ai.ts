import { type Move } from "~/types/board";

export function aiGetMove(moves: Move[]): Move | undefined {
  const randomTargetIndex = Math.floor(Math.random() * moves.length);

  const move: Move | undefined = moves[randomTargetIndex];

  return move;
}
