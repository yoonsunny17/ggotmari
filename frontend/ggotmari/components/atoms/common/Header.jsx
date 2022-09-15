export default function Header({ text, type, onClick }) {
  return (
    <div className="flex justify-center font-maru font-medium text-main text-2xl mt-3">
      {text}
    </div>
  );
}