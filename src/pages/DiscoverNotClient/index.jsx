import { NotClientNavBar } from "../../components/NotClientNavBar";
import { SearchBar } from "../../components/SearchBar";
import { ProductFeed } from "../../components/ProductFeed";
import { useState } from "react";

export function DiscoverNotClient() {
  const [search, setSearch] = useState("");
  function changeSearch(text) {
    setSearch(text);
  }
  return (
    <div className="min-h-screen">
      <NotClientNavBar />
      <SearchBar changeSearch={changeSearch} />
      <ProductFeed search={search} />
    </div>
  );
}
