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
      <form className="w-full flex justify-center mb-8">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          className="rounded-2xl w-10/12"
        />
      </form>
      {/*Acrescentar ícone de busca*/}
    </div>
  );
}
