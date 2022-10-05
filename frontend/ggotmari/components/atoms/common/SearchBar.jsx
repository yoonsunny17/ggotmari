import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ placeholder, onChange, searchTerm, handleEnterEvent }) {
  const handleEnterClick = (e) => {
    console.log(e);
    console.log(e.keyCode);
    console.log(e.charCode);
    if (e.key == "Enter") {
      handleEnterEvent();
    }
  };

  return (
    <div className="mt-1 form-control bg-font3 w-5/6 h-9 rounded-md">
      <label className="input-group h-full items-center px-3">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder={placeholder}
          className="input bg-font3 w-full h-full text-xs focus:outline-none"
          onChange={onChange}
          onKeyDown={handleEnterClick}
          value={searchTerm}
        />
      </label>
    </div>
  );
}

export default SearchBar;
