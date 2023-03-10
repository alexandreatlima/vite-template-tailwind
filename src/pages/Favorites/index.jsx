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
      <h1 className="w-1/3 font-semibold mb-6 text-3xl text-indigo-900 pl-28 pb-5 underline">
        Your favorites:
      </h1>
      <section className="w-screen flex flex-col items-center min-h-screen">
        <div className="w-10/12 pt-8 rounded flex flex-col items-center">
          {favorites.map((currentFavorite) => {
            return (
              <article
                key={currentFavorite._id}
                className="flex flex-row border border-indigo-200 items-center w-10/12 rounded-lg w-11/12 px-4 py-6 h-28"
              >
                <div className="w-1/3 h-full">
                  <img
                    src={currentFavorite.picture}
                    className="w-44 max-h-full shadow-xl rounded-md"
                  />
                </div>
                <div className="w-1/3 flex flex-col flex-nowrap items-center gap-2">
                  <h2 className="text-center text-2xl font-semibold text-indigo-900">
                    {currentFavorite.name}
                  </h2>
                  <h3 className="italic text-center text-sm">
                    Address: {currentFavorite.address}
                  </h3>
                </div>
                <div className="w-1/3 text-center">
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
        </div>
      </section>
    </>
  );
}
