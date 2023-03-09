import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { ClientNavBar } from "../../components/ClientNavBar";

export function ClientOrder() {
  const [orders, setOrder] = useState({});
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/api/order/get/${params.idOrder}`);
        console.log(response.data);
        setOrder(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, [reload]);

  async function cancelOrder() {
    try {
      if (
        ["CANCELED", "CONCLUDED", "REJECTED BY COMPANY"].includes(orders.status)
      ) {
        // Colocar toast dizendo que nao pode alterar por que o pedido ja foi cancelado, rejeitado, ou concluido.
      } else {
        await api.put(`/api/order/edit/status/${params.idOrder}`, {
          status: "CANCELED",
        });
        setReload(!reload);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ClientNavBar />
      <h1>Here is your order</h1>
      {!isLoading && (
        <>
          <h2>Product: {orders.product.name}.</h2>
          <h2>Business: {orders.business.name}.</h2>
          <h2>Client: {orders.client.name}.</h2>
          <h2>Status: {orders.status}.</h2>

          <button onClick={cancelOrder} className="btn-indigo">
            Cancel order
          </button>
        </>
      )}
    </>
  );
}
