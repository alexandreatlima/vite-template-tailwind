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
      <form>
        <input
          type="search"
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
