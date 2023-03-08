import { ClientNavBar } from "../../components/ClientNavBar";
import { SearchBar } from "../../components/SearchBar";
import { ProductFeed } from "../../components/ProductFeed";
import { useState } from "react";

export function ClientDiscover() {
  const [search, setSearch] = useState("");
  function changeSearch(text) {
    setSearch(text);
  }
  return (
    <div className="min-h-screen">
      <ClientNavBar />
      <SearchBar changeSearch={changeSearch} />
      <ProductFeed search={search} />
    </div>
  );
}
