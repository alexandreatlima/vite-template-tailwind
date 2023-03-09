import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessOrderDetail() {
  const [orders, setOrder] = useState({});
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/api/order/get/${params.orderId}`);
        console.log(response.data);
        setOrder(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
  }, [reload]);

  return (
    <div>
      <BusinessNavBar />
      <h1>Detalhe do pedido na visão do adm</h1>
      {!isLoading && (
        <>
          <h2>{orders.product.name}</h2>
          <h2>{orders.business.name}</h2>
          <h2>{orders.client.name}</h2>
          <h2>{orders.status}</h2>

          <h1>Colocar opções de status do admin</h1>
        </>
      )}
    </div>
  );
}
