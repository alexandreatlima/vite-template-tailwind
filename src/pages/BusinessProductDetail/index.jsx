import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NameLogo } from "../../components/NameLogo";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({ expirationDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/api/product/get/${params.idProduct}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit() {
    try {
      await api.put(`/api/product/edit/${product._id}`, form);
      setShowForm(false);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    await api.delete(`/api/product/delete/${params.idProduct}`);
    navigate("/business/admin");
  }

  // fazer inputs do form com value do form no handleChange
  return (
    <div>
      <BusinessNavBar />
      <section className="container flex flex-row justify-center items-center mx-auto mt-5 py-5 w-11/12 bg-slate-100 border-2 border-indigo-900 rounded-xl">
        <div className="w-1/2 p-auto border-r-2 border-slate-200 flex justify-center items-center">
          <img
            src={product.picture}
            alt="Food appearence"
            className="max-w-fit rounded-md shadow-black shadow-lg max-h-96"
          />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <ul>
            <li>
              <span className="font-semibold">- Name: </span>
              {product.name}.
            </li>
            <li>
              <span className="font-semibold">- Price:</span>
              {` R$${Math.floor(product.price / 100)},${
                String(product.price)[String(product.price).length - 2]
              }${String(product.price)[String(product.price).length - 1]}`}
              .
            </li>

            <li>
              <span className="font-semibold">- Description:</span>{" "}
              {product.description}.
            </li>
            <li>
              <span className="font-semibold">- Expiration date:</span>{" "}
              {product.expirationDate}.
            </li>
          </ul>
        </div>
      </section>

      <button
        className="btn-indigo bg-yellow-500"
        onClick={() => setShowForm(!showForm)}
      >
        Editar Produtos aqui
      </button>

      <button className="btn-indigo bg-red-500" onClick={handleDelete}>
        Excluir produto
      </button>

      {showForm && (
        <>
          <form>
            aqui vai o formulario para editar o produto
            <label htmlFor="expirationDate">Set new expiration date: </label>
            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={form.expirationDate}
              onChange={handleChange}
            />
          </form>
          <button onClick={handleSubmit}>Salvar</button>
          <footer className="text-xs italic">
            <p>
              Other changes are not allowed. Please make another product to
              change name, description, picture and price.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
