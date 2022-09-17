import { AiOutlineDown } from "react-icons/ai";

function CommentDrawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        "fixed overflow-hidden z-10 inset-0 transform ease-in-out" +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-y-0"
          : "transition-all delay-500 opacity-0 translate-y-full")
      }
    >
      <section
        className={
          "h-full bg-white max-w-lg bottom-0 absolute shadow-xl delay-400 duration-500 ease-in-out transition-all transform rounded-t-lg" +
          (isOpen ? " translate-y-0 " : " translate-y-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div
            className="flex flex-row justify-between items-center p-4 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <div className="font-bold text-lg text-black">댓글</div>
            <AiOutlineDown className="text-2xl" />
          </div>
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

export default CommentDrawer;
