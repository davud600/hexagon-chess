import Head from "next/head";
import Index from "./home";
export default function Main() {
  return (
    <>
      <Head>
        <title>Hexagonal Chess</title>
        <meta name="description" content="Chess but hexagons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </>
  );
}
