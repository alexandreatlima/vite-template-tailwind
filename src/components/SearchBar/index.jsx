import { useState } from "react";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  function handleChange(e) {
    setSearchText(e.target.value);
  }
  return (
    <div>
      <form>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
        />
      </form>
      {/*Acrescentar ícone de busca*/}
    </div>
  );
}
