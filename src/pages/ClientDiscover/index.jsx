import { ClientNavBar } from "../../components/ClientNavBar";
import { SearchBar } from "../../components/SearchBar";
import { ProductFeed } from "../../components/ProductFeed";

export function ClientDiscover() {
  return (
    <>
      <ClientNavBar />
      <SearchBar />
      <ProductFeed />
    </>
  );
}
