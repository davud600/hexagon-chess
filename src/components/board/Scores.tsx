import { useBoard } from "~/context/BoardContext";

export default function Scores() {
  const { ScoreState } = useBoard();

  return (
    <div className="flex flex-col text-3xl">
      <span>white score: {ScoreState.whiteScore - ScoreState.blackScore}</span>
      <span>black score: {ScoreState.blackScore - ScoreState.whiteScore}</span>
    </div>
  );
}
