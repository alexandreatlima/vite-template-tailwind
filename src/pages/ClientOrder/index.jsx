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
    <div className="h-screen bg-slate-500/20">
      <ClientNavBar />
      <div className="mt-6 mx-auto px-24 py-12 flex flex-col gap-8 items-center bg-white/90 rounded-md w-1/2 drop-shadow-2xl shadow-black">
        <h1 className="text-center text-5xl underline mb-2">
          Here is your order:
        </h1>
        {!isLoading && (
          <>
            <section>
              <div className="text-sm">
                <h2>
                  <span className="font-semibold">- Product: </span>
                  {orders.product.name}.
                </h2>
                <ul>
                  <li>
                    <span className="font-semibold">- Business: </span>
                    {orders.business.name}.
                  </li>
                  <li>
                    <span className="font-semibold">- Client: </span>
                    {orders.client.name}.
                  </li>
                  <li className="w-96 flex flex-row justify-start items-start flex-nowrap">
                    <h3 className="font-semibold w-64">- Description: </h3>
                    <p className="italic text-sm">
                      {orders.product.description}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row justify-center">
                <h3 className="mt-6 font-bold text-2xl">
                  <span>Status: </span>
                  {orders.status}.
                </h3>
              </div>
            </section>
            <div>
              <button onClick={cancelOrder} className="btn-indigo">
                Cancel order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
