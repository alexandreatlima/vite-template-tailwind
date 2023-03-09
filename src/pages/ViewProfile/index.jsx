import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { ClientNavBar } from "../../components/ClientNavBar";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

export function ViewProfile() {
  const [form, setForm] = useState([]),
    [orders, setOrders] = useState([]),
    navigate = useNavigate(),
    context = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true),
    [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");
        const responseOrders = await api.get("/api/order/get/myOrders");
        setForm(response.data);
        setOrders(responseOrders.data.orders);
        setisLoading(false);
        console.log(responseOrders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, [reload]);

  console.log(orders);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    context.setLoggedInUser(null);
    console.log("I am here");
    navigate("/");
  }

  async function handleDelete(e) {
    try {
      await api.delete(`/api/order/delete/${e.target.value}`);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  function handleNavigate(e) {
    try {
      navigate(`/user/viewOrder/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen">
      <ClientNavBar />
      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your profile here
        </h1>
        <img
          src={form.picture}
          className="w-56 h-56 rounded-full mb-5 border-4 border-black"
        ></img>
        <div className="max-w-full justify-evenly items-start flex flex-row flex-wrap gap-4 flex-wrap w-11/12 border-t border-t-indigo-800 mx-auto box-border p-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Name</p>
            <p className="text-sm">{form.name}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Email</p>
            <p className="text-sm">{form.email}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Type</p>
            <p className="text-sm">{form.type}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Address</p>
            <p className="text-sm">{form.address}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Neighborhood</p>
            <p className="text-sm">{form.neighborhood}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">CPF</p>
            <p className="text-sm">{form.cpf}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Contact Phone</p>
            <p className="text-sm">{form.contactPhone}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-8">
            <Link to={"/user/profile"}>
              <button className="btn-indigo">Edit</button>
            </Link>
            <button onClick={handleLogOut} type="submit" className="btn-indigo">
              Log out
            </button>
          </div>
        </div>
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900 border-t-2 border-t-indigo-900 w-screen mt-6 text-center pt-6">
          Your orders here
        </h1>
        <section className="container bg-white flex flex-col items-center justify-between mx-auto flex-wrap gap-8 mt-5 py-5 w-9/12 bg-slate-100 border-2 border-indigo-900 rounded-3xl">
          {!isLoading &&
            orders.map((currentOrder) => {
              return (
                <article
                  key={currentOrder._id}
                  className="w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-4 border-b-2 py-2"
                >
                  <div className="w-2/10 flex flex-row justify-center">
                    <img
                      src={currentOrder.business.picture}
                      alt="product picture"
                      className="w-24 h-24 rounded-full max-h-full"
                    />
                  </div>
                  <div className="w-3/10 flex flex-row justify-start">
                    <ul>
                      <li>
                        <span className="font-semibold">- Business: </span>
                        {currentOrder.business.name}
                      </li>
                      <li>
                        <span className="font-semibold">- Product: </span>
                        {currentOrder.product.name}
                      </li>
                      <li>
                        <span className="font-semibold">- Price:</span>{" "}
                        {`R$ ${Math.floor(currentOrder.product.price / 100)},${
                          String(currentOrder.product.price)[
                            String(currentOrder.product.price).length - 2
                          ]
                        }${
                          String(currentOrder.product.price)[
                            String(currentOrder.product.price).length - 1
                          ]
                        }`}
                      </li>
                    </ul>
                  </div>
                  <div className="w-36 flex justify-start flex-wrap">
                    <h2 className="w-11/12 font-bold font-color-gray-200">
                      <span className="font-semibold">Status: </span>
                      {currentOrder.status}
                    </h2>
                  </div>
                  <div className="w-2/10">
                    <button
                      value={currentOrder._id}
                      className="btn-indigo"
                      onClick={handleNavigate}
                    >
                      View
                    </button>
                  </div>
                  <div className="w-1/10">
                    <button
                      value={currentOrder._id}
                      className="btn-indigo bg-red-400 hover:bg-red-500"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
        </section>
      </section>
    </div>
  );
}
