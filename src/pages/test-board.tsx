import Board from "~/components/board/Board";
import BoardHistoryControllers from "~/components/board/HistoryControllers";
import BoardProvider from "~/context/BoardContext";
import BoardHistoryProvider from "~/context/BoardHistoryContext";

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
