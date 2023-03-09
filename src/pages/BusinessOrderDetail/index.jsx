import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";

export function BusinessOrderDetail() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/api/order/get/${params.orderId}`);
        console.log("response.data below:");
        console.log(response.data);
        setOrder(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrder();
  }, [reload]);

  async function changeOrderStatus(event) {
    try {
      if (
        ["CANCELED", "CONCLUDED", "REJECTED BY COMPANY"].includes(order.status)
      ) {
        // Colocar toast dizendo que nao pode alterar por que o pedido ja foi cancelado, rejeitado, ou concluido.
      } else {
        await api.put(`/api/order/edit/status/${params.orderId}`, {
          status: event.target.value,
        });
        setReload(!reload);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Detalhe do pedido na visão do adm</h1>
      <h1>Here is your order</h1>
      {!isLoading && (
        <>
          <h2>Product: {order.product.name}.</h2>
          <h2>Business: {order.business.name}.</h2>
          <h2>Client: {order.client.name}.</h2>
          <h2>Status: {order.status}.</h2>

          <button
            value="REJECTED BY COMPANY"
            onClick={changeOrderStatus}
            className="btn-indigo bg-red-500"
          >
            Reject Order
          </button>
          <button
            value="CONFIRMED BY COMPANY"
            onClick={changeOrderStatus}
            className="btn-indigo"
          >
            Confirm Order
          </button>
          <button
            value="CONCLUDED"
            onClick={changeOrderStatus}
            className="btn-indigo bg-green-500"
          >
            Mark as concluded
          </button>
        </>
      )}
    </div>
  );
}
