import { useEffect, useState } from "react";

export function SearchBar(props) {
  const { changeSearch } = props;
  const [searchText, setSearchText] = useState("");
  function handleChange(e) {
    setSearchText(e.target.value);
    changeSearch(e.target.value);
  }
  useEffect(() => {
    return () => {
      setSearchText("");
      changeSearch("");
    };
  }, []);
  return (
    <div>
      <form className="bg-white rounded-2xl w-9/12 flex justify-center align-center mb-6 mx-auto border border-black">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          className="rounded-2xl w-full"
        />
      </form>
    </div>
  );
}
