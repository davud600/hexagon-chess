import Board from "~/components/board/Board";
import BoardHistoryControllers from "~/components/board/HistoryControllers";
import BoardProvider from "~/context/BoardContext";
import GameSettingsProvider from "~/context/GameSettingsContext";

export default function Test() {
  return (
    <>
      <GameSettingsProvider>
        <BoardProvider>
          <BoardHistoryControllers />
          <Board />
        </BoardProvider>
      </GameSettingsProvider>
    </>
  );
}
