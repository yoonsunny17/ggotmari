import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({ placeholder, onChange, searchTerm, handleEnterEvent }) {
  const handleEnterClick = () => {
    if (window.event.keyCode == 13) {
      handleEnterEvent();
    }
  };

  return (
    <div className="form-control bg-font3 w-5/6 h-8 rounded-md">
      <label className="input-group h-full items-center px-3">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder={placeholder}
          className="input bg-font3 w-full h-full text-xs focus:outline-none"
          onChange={onChange}
          onKeyUp={handleEnterClick}
          value={searchTerm}
        />
      </label>
    </div>
  );
}

export default SearchBar;
