import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

// Aqui faltam btns para fazer softdelete nas orders antigas.

export function BusinessAdmin() {
  const [myOrders, setMyOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response1 = await api.get("/api/order/get/myOrders");
        const response2 = await api.get("/api/product/get/myProducts");
        setMyOrders(response1.data);
        setMyProducts(response2.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrder();
  }, []);

  console.log(myOrders);
  console.log(myProducts);

  return (
    <div className="min-h-screen w-screen mb-0">
      <BusinessNavBar />
      <div className="flex flex-row justify-center h-40 bg-white rounded drop-shadow-lg flex justify-center gap-20 items-end pb-12 px-16 border-b-4 border-indigo-900 w-10/12 mx-auto mb-4">
        <h1 className="text-6xl text-indigo-900">Admin Page</h1>
      </div>
      {!isLoading && (
        <div className="container border-none flex flex-col items-center w-screen">
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-4">
              My orders
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6 ">
              {myOrders.orders
                .filter(
                  (currentOrder) =>
                    currentOrder.status !== "CANCELED" &&
                    currentOrder.status !== "CONCLUDED" &&
                    currentOrder.status !== "REJECTED BY COMPANY"
                )
                .map((currentOrder) => {
                  return (
                    <div key={currentOrder._id}>
                      <p>{currentOrder.client.name}</p>
                      <p>{currentOrder.product.name}</p>
                      <p>{currentOrder.status}</p>
                      <Link
                        to={`/business/admin/viewOrder/${currentOrder._id}`}
                      >
                        Orders details
                      </Link>
                    </div>
                  );
                })}
            </div>
          </section>
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-48">
              My Products
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6">
              {myProducts.map((currentProduct) => {
                return (
                  <div key={currentProduct._id}>
                    <p>{currentProduct.name}</p>
                    <p>{`R$ ${Math.floor(currentProduct.price / 100)},${
                      String(currentProduct.price)[
                        String(currentProduct.price).length - 2
                      ]
                    }${
                      String(currentProduct.price)[
                        String(currentProduct.price).length - 1
                      ]
                    }`}</p>
                    <p>{currentProduct.description}</p>
                    <img
                      src={currentProduct.picture}
                      className="w-52 max-h-56"
                    />
                    <Link
                      to={`/business/admin/viewMagic/${currentProduct._id}`}
                    >
                      Detalhes do Produto
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="w-10/12 mb-0">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold text-center">
              History
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6">
              {myOrders.orders
                .filter(
                  (currentOrder) =>
                    currentOrder.status == "CANCELED" ||
                    currentOrder.status == "CONCLUDED" ||
                    currentOrder.status == "REJECTED BY COMPANY"
                )
                .map((currentOrder) => {
                  return (
                    <div key={currentOrder._id}>
                      <p>{currentOrder.client.name}</p>
                      <p>{currentOrder.product.name}</p>
                      <p>{currentOrder.status}</p>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
