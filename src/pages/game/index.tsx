import Head from "next/head";
import Board from "~/components/board/Board";

const Game = () => {
  return (
    <>
      <Head>
        <title>Hexagonal Chess</title>
        <meta name="description" content="Chess but hexagons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Game;
