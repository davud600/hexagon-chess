import Board from "~/components/board/Board";
import BoardHistoryControllers from "~/components/board/HistoryControllers";
import Scores from "~/components/board/Scores";
import BoardProvider from "~/context/BoardContext";
import GameSettingsProvider from "~/context/GameSettingsContext";

export default function Test() {
  return (
    <>
      <GameSettingsProvider>
        <BoardProvider>
          <BoardHistoryControllers />
          <Scores />
          <Board />
        </BoardProvider>
      </GameSettingsProvider>
    </>
  );
}
