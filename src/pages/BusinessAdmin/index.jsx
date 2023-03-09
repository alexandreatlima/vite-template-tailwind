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
    <div>
      <BusinessNavBar />
      {!isLoading && (
        <>
          <h1>My orders</h1>

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
                  <Link to={`/business/admin/viewOrder/${currentOrder._id}`}>
                    Orders details
                  </Link>
                </div>
              );
            })}

          <h1>My Products</h1>

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
                <img src={currentProduct.picture} className="w-52 max-h-56" />
                <Link to={`/business/admin/viewMagic/${currentProduct._id}`}>
                  Detalhes do Produto
                </Link>
              </div>
            );
          })}

          <h1>History</h1>

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
        </>
      )}
    </div>
  );
}
