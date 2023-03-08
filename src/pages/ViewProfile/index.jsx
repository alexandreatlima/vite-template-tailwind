import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

export function ViewProfile() {
  const [form, setForm] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");
        const responseOrders = await api.get("/api/order/get/myOrders");
        setForm(response.data);
        setOrders(responseOrders.data);
        console.log(responseOrders);
        console.log(orders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Your profile here</h1>

      <p>{form.name}</p>
      <p>{form.email}</p>
      <p>{form.type}</p>
      <p>{form.address}</p>
      <p>{form.neighborhood}</p>
      <p>{form.cpf}</p>
      <p>{form.contactPhone}</p>

      <Link to={"/user/profile"}>
        <button className="btn-indigo">Edit</button>
      </Link>
      {/* 
      {orders.map((currentOrder) => {
        return <h2>{currentOrder.idUser}</h2>;
      })}
      <Link to={"/user/order"}>
        <button className="btn-indigo">Check all orders</button>
      </Link> */}

      <button
        onClick={handleLogOut}
        type="submit"
        className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Log out
      </button>
    </>
  );
}
