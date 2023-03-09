import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";
import { useNavigate } from "react-router-dom";

export function Favorites() {
  const [favorites, setFavorites] = useState([]),
    [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await api.get("/api/user/get/all-favorites");
        console.log(response.data.favorites);
        setFavorites(response.data.favorites);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFavorites();
  }, [reload]);

  async function handleUnfollow(e) {
    try {
      await api.put(`/api/user/edit/favorites/${e.target.value}`);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ClientNavBar />
      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your favorites here
        </h1>
        {favorites.map((currentFavorite) => {
          return (
            <article
              key={currentFavorite._id}
              className="flex flex-row border border-indigo-400 justify-evenly items-center"
            >
              <img src={currentFavorite.picture} className="w-48 max-h-52" />
              <div className="flex flex-col justify-center items-center">
                <h2>{currentFavorite.name}</h2>
                <button
                  value={currentFavorite._id}
                  className="btn-indigo"
                  onClick={handleUnfollow}
                >
                  Unfollow
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
