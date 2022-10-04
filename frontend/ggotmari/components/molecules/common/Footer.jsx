import Link from "next/link";
import { getUserName } from "../../../api/user.js";
import {
  IoFlowerOutline,
  IoArrowBack,
  IoHomeOutline,
  IoPersonCircleOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

function Footer() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const success = (res) => {
    // console.log(res);
    setUsername(res.data.userName);
  };

  const clickSuccess = (res) => {
    // console.log(res);
    setUsername(res.data.userName);
    moveProfile(res.data.userName);
  };
  const moveProfile = async (user) => {
    await router.push(`/profile/${user}`);
  };

  const fail = (err) => console.log(err);

  const getInfo = async () => {
    await getUserName(success, fail);
  };

  const clickInfo = async () => {
    await getUserName(clickSuccess, fail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getInfo();
    }
  }, []);

  const onCheck = async () => {
    if (localStorage.getItem("accessToken")) {
      await clickInfo();
      // router.push(`/profile/${username}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-row w-full z-20 justify-around fixed bottom-0 bg-white p-3 items-center border-t-2 border-font3">
      {/* <Link href="/">
        <a>
          <IoArrowBack className="text-main text-2xl" />
        </a>
      </Link> */}
      <button aria-label="go-back" onClick={() => router.back()}>
        <IoArrowBack className="text-main text-2xl" />
      </button>
      <Link href="/community">
        <a aria-label="community">
          <IoChatbubblesOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/">
        <a aria-label="home">
          <IoHomeOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/flower/search">
        <a aria-label="flower">
          <IoFlowerOutline className="text-main text-2xl" />
        </a>
      </Link>
      <button aria-label="profile" onClick={onCheck}>
        <IoPersonCircleOutline className="text-main text-3xl" />
      </button>
    </div>
  );
}

export default Footer;
