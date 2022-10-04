import "../styles/globals.css";

import Head from "next/head";

import { useRouter } from "next/router";
import Footer from "../components/molecules/common/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component key={router.asPath} {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
