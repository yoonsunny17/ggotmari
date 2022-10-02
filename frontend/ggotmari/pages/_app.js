import "../styles/globals.css";
import Footer from "../components/molecules/common/Footer";
import { useRouter } from "next/router";

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
