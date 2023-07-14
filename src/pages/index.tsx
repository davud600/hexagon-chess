import Head from "next/head";
import HomePage from "./home";
export default function Main() {
  return (
    <div>
      <Head>
        <title>Hexagonal Chess</title>
        <meta name="description" content="Chess but hexagons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  );
}
