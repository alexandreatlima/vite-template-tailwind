import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ProductFeed(props) {
  const { search } = props;
  const [productFeed, setProductFeed] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await api.get("/api/product/get/all");
        setProductFeed(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllProducts();
  }, []);

  return (
    <section className="w-screen flex flex-col items-center">
      <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
        Produtos disponíveis
      </h1>
      <div className="flex flex-row gap-10 flex-wrap w-11/12 border-t border-t-indigo-800 mx-auto box-border p-6">
        {productFeed
          .filter(
            (cE) =>
              cE.name.toLowerCase().includes(search.toLowerCase()) ||
              cE.creator.neighborhood
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((cE) => {
            return (
              <article className="container bg-slate-100 border border-indigo-300 flex flex-col justify-between items-center w-1/4 gap-5 justify-evenly py-5">
                <img
                  src={cE.picture}
                  alt="Product appearence."
                  className="rounded-2xl shadow-xl"
                />
                <div className="flex flex-col items-center gap-2">
                  <h2 className="font-semibold text-3xl">{cE.name}</h2>
                  <p className="text-xs italic text-center">
                    Address: {cE.creator.address}.
                  </p>
                  <p className="text-sm font-semibold text-center">
                    Neighborhood: {cE.creator.neighborhood}.
                  </p>
                </div>
                <Link to={`/user/viewMagic/${cE._id}`}>
                  <button className="btn-indigo w-28">See details</button>
                </Link>
              </article>
            );
          })}
      </div>
    </section>
  );
}
