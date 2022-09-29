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

  const fail = (err) => console.log(err);

  const getInfo = () => {
    getUserName(success, fail);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      getInfo();
    }
  }, []);

  // console.log(username);

  const onCheck = () => {
    if (localStorage.getItem("accessToken") && username) {
      router.push(`/profile/${username}`);
    } else if (localStorage.getItem("accessToken") && !username) {
      getInfo();
      router.push(`/profile/${username}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-row w-full z-20 justify-around fixed bottom-0 bg-white p-3 items-center border-t-2 border-font3">
      {/* <Link href="/">
        <a>
          <IoArrowBack className="text-main text-2xl" />
        </a>
      </Link> */}
      <button onClick={() => router.back()}>
        <IoArrowBack className="text-main text-2xl" />
      </button>
      <Link href="/community">
        <a>
          <IoChatbubblesOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/">
        <a>
          <IoHomeOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/flower/search/all">
        <a>
          <IoFlowerOutline className="text-main text-2xl" />
        </a>
      </Link>
      <button onClick={onCheck}>
        <IoPersonCircleOutline className="text-main text-3xl" />
      </button>
    </div>
  );
}

export default Footer;
