function Header({ text, type, onClick }) {
  return (
    <div className="flex justify-center font-maru text-main text-xl font-semibold my-5">
      {text}
    </div>
  );
}

export default Header;
