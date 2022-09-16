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
    <div className="flex flex-row w-full justify-around fixed bottom-0 bg-white p-3 items-center border-t-2 border-font3">
      <Link href="javascript:history.back()">
        <IoArrowBack className="text-main text-2xl" />
      </Link>
      <Link href="/community">
        <IoFlowerOutline className="text-main text-2xl" />
      </Link>
      <Link href="/">
        <IoHomeOutline className="text-main text-2xl" />
      </Link>
      <Link href="#">
        <IoPaperPlaneOutline className="text-main text-2xl" />
      </Link>
      <Link href="/profile">
        <IoPersonCircleOutline className="text-main text-3xl" />
      </Link>
    </div>
  );
}

export default Footer;
