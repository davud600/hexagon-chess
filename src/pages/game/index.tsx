import Head from "next/head";


const Game = () => 
{
    return(
        <>
        <Head>
        <title>Hexagonal Chess</title>
        <meta name="description" content="Chess but hexagons" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <span>Here will be the board!</span>
        </>
    )
};

export default Game;