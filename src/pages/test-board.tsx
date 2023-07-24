import Board from "~/components/board/Board";
import BoardProvider from "~/context/BoardContext";
import BoardHistoryProvider, {
  useBoardHistory,
} from "~/context/BoardHistoryContext";

function BoardHistoryControllers() {
  const { viewNextBoardInHistory, viewPreviousBoardInHistory } =
    useBoardHistory();

  return (
    <div className="bg-red flex w-full justify-center">
      <button onClick={viewPreviousBoardInHistory}>prev board</button>
      <button onClick={viewNextBoardInHistory}>next board</button>
    </div>
  );
}

export default function Test() {
  return (
    <>
      <BoardProvider>
        <BoardHistoryProvider>
          <BoardHistoryControllers />
          <Board />
        </BoardHistoryProvider>
      </BoardProvider>
    </>
  );
}
