import Head from "next/head";
import Header from "./components/header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GameZop Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Common header for all the components */}
      <Header />
      <Component {...pageProps}/>
    </>
  );
}

export default MyApp;
