import { useState, useEffect } from "react";
import { api } from "../../api/api";

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
      <h1>Your favorites in here</h1>
      {favorites.map((currentFavorite) => {
        return <h2>{currentFavorite.idUser}</h2>;
      })}
      <button className="btn-indigo">Unfollow</button>
    </>
  );
}
