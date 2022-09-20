function Header({ text, type, onClick }) {
  return (
    <div className="flex justify-center font-gangwon text-main text-2xl font-semibold mt-5 mb-4">
      {text}
    </div>
  );
}

export default Header;
