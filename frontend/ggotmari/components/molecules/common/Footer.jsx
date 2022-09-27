import Link from "next/link";
import { useRouter } from "next/router";

import {
  IoFlowerOutline,
  IoArrowBack,
  IoHomeOutline,
  IoPersonCircleOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { BsPeople } from "react-icons/bs";

function Footer() {
  const router = useRouter();
  const { username } = router.query;

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
      <Link href="profile/[username]" as={`/profile/${username}`}>
        <a>
          <IoPersonCircleOutline className="text-main text-3xl" />
        </a>
      </Link>
    </div>
  );
}

export default Footer;
