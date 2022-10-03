import "../styles/globals.css";

import { useRouter } from "next/router";
import Footer from "../components/molecules/common/Footer";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Component key={router.asPath} {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
