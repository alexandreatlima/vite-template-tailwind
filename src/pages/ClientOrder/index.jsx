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

  async function deleteOrder() {
    try {
      await api.put(`/api/order/edit/status/${params.idOrder}`, {
        status: "CANCELED",
      });
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ClientNavBar />
      <h1>Your current order in here</h1>
      {!isLoading && (
        <>
          <h2>{orders.product.name}</h2>
          <h2>{orders.business.name}</h2>
          <h2>{orders.client.name}</h2>
          <h2>{orders.status}</h2>

          <button onClick={deleteOrder} className="btn-indigo">
            Cancel order
          </button>
        </>
      )}
    </>
  );
}
