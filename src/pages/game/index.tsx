import Head from "next/head";
import Board from "~/components/board/Board";
import BoardHistoryControllers from "~/components/board/HistoryControllers";
import Scores from "~/components/board/Scores";
import BoardProvider from "~/context/BoardContext";

const Game = () => {
  return (
    <>
      <Head>
        <title>Hexagonal Chess</title>
        <meta name="description" content="Chess but hexagons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BoardProvider>
        <BoardHistoryControllers />
        <Scores />
        <Board />
      </BoardProvider>
    </>
  );
};

export default Game;
