import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";

export function ClientOrder() {
  const [orders, setOrder] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/api/user/get/${params.idOrder}`);
        setOrder(response.data.orders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <>
      <ClientNavBar />
      <h1>Your current order in here</h1>

      <h2>{orders.product}</h2>
      <h2>{orders.business}</h2>
      <h2>{orders.client}</h2>
      <h2>{orders.status}</h2>

      <button className="btn-indigo">Cancel order</button>
    </>
  );
}
