import { useBoard } from "~/context/BoardContext";

export default function BoardHistoryControllers() {
  const { viewNextBoardInHistory, viewPreviousBoardInHistory } = useBoard();

  return (
    <div className="bg-red flex w-full justify-center">
      <button onClick={viewPreviousBoardInHistory}>prev board</button>
      <button onClick={viewNextBoardInHistory}>next board</button>
    </div>
  );
}
