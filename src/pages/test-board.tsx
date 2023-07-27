import Board from "~/components/board/Board";
import BoardHistoryControllers from "~/components/board/HistoryControllers";
import BoardProvider from "~/context/BoardContext";
import BoardHistoryProvider from "~/context/BoardHistoryContext";
import GameSettingsProvider from "~/context/GameSettingsContext";

export default function Test() {
  return (
    <>
      <GameSettingsProvider>
        <BoardProvider>
          <BoardHistoryProvider>
            <BoardHistoryControllers />
            <Board />
          </BoardHistoryProvider>
        </BoardProvider>
      </GameSettingsProvider>
    </>
  );
}
