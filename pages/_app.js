import Head from 'next/head';
import Header from './header';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>GameZop Assignment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header></Header>
      </>
  )
}

export default MyApp
