import { useRouter } from "next/router";
import ProfileFollowList from "../../../components/organisms/profile/ProfileFollowList";
import { useEffect } from "react";
import Head from "next/head";

function ProfileFollow() {
  const router = useRouter().query.username;

  const arr = undefined;
  useEffect(() => {
    if (!localStorage.getItem("accessToken") && !arr?.push) {
      console.log("error by undefined push");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Follow | GGOTMARI</title>
        <meta property="og:title" content="Follow List" key="follow" />
        <meta
          name="description"
          content="Here can check followers and followings."
        />
      </Head>
      <div className="username-box my-6">
        <span className="username mx-6 font-sansbold text-font1 text-lg">
          {router} 님
        </span>
      </div>
      <ProfileFollowList />
    </>
  );
}

export default ProfileFollow;
