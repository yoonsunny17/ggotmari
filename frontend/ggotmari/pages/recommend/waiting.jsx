import Header from "../../components/atoms/common/Header";
import Head from "next/head";

function WaitingResult() {
  return (
    <div>
      <Head>
        <title>Loading | GGOTMARI</title>
        <meta property="og:title" content="Loading" key="Loading" />
        <meta name="description" content="Loading" />
      </Head>
      <Header text={"꽃에 담은 편지"} />
      <div className="font-gangwon">편지를 읽고 있어요...!</div>
    </div>
  );
}

export default WaitingResult;
