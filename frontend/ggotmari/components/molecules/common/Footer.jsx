import {
  IoFlowerOutline,
  IoArrowBack,
  IoHomeOutline,
  IoPersonCircleOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-row w-full z-20 justify-around fixed bottom-0 bg-white p-3 items-center border-t-2 border-font3">
      <Link href="#">
        <a>
          <IoArrowBack className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/community">
        <a>
          <IoFlowerOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/">
        <a>
          <IoHomeOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/recommend">
        <a>
          <IoPaperPlaneOutline className="text-main text-2xl" />
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <IoPersonCircleOutline className="text-main text-3xl" />
        </a>
      </Link>
    </div>
  );
}

export default Footer;
