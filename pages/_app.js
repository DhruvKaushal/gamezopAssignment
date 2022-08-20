import Head from "next/head";
import Header from "./components/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GameZop Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}

export default MyApp;
