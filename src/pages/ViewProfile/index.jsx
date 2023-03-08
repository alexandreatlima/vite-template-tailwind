import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { ClientNavBar } from "../../components/ClientNavBar";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

export function ViewProfile() {
  const [form, setForm] = useState([]),
    [orders, setOrders] = useState([]),
    navigate = useNavigate(),
    context = useContext(AuthContext);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");
        const responseOrders = await api.get("/api/order/get/myOrders");
        setForm(response.data);
        setOrders(responseOrders.data.orders);
        console.log(responseOrders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, []);

  console.log(orders);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    context.setLoggedInUser(null);
    console.log("I am here");
    navigate("/");
  }

  return (
    <div className="h-screen">
      <ClientNavBar />

      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your profile here
        </h1>
        <img src="https://res.cloudinary.com/dukhlscyh/image/upload/v1678297300/pictures/file_zbjqpx.png"></img>
        <div className="justify-evenly flex flex-row flex-nowrap gap-4 flex-wrap w-11/12 border-t border-t-indigo-800 mx-auto box-border p-6">
          <p>{form.name}</p>
          <p>{form.email}</p>
          <p>{form.type}</p>
          <p>{form.address}</p>
          <p>{form.neighborhood}</p>
          <p>{form.cpf}</p>
          <p>{form.contactPhone}</p>

          <div className="flex flex-row justify-center items-center gap-10">
            <Link to={"/user/profile"}>
              <button className="btn-indigo">Edit</button>
            </Link>

            <button onClick={handleLogOut} type="submit" className="btn-indigo">
              Log out
            </button>
          </div>
        </div>
        <section className="flex flex-row justify-evenly">
          {orders.map((currentOrder) => {
            return <h2>{currentOrder.business.name}</h2>;
          })}
        </section>
      </section>
    </div>
  );
}
