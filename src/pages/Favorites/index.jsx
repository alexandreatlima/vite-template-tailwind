import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get("/api/user/get/all-favorites");
        console.log(response.data);
        // setFavorites([...response.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFavorites();
  }, []);
  return (
    <>
      <ClientNavBar />

      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your favorites here
        </h1>
        {favorites.map((currentFavorite) => {
          return <h2>{currentFavorite.idUser}</h2>;
        })}
        <button className="btn-indigo">Unfollow</button>
      </section>
    </>
  );
}
