import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";

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
      <Link to="/business/admin/create-form">Create your order here</Link>
      <Link to="/business/admin/profile">Profile</Link>
      {!isLoading && (
        <>
          <h1>My orders</h1>

          {myOrders.orders
            .filter(
              (currentOrder) =>
                currentOrder.status !== "CANCELED" &&
                currentOrder.status !== "CONCLUDED"
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

          <h1>My Products</h1>

          {myProducts.map((currentProduct) => {
            return (
              <div key={currentProduct._id}>
                <p>{currentProduct.name}</p>
                <p>{currentProduct.price}</p>
                <p>{currentProduct.description}</p>
                <img src={currentProduct.picture} />
              </div>
            );
          })}

          <h1>History</h1>

          {myOrders.orders
            .filter(
              (currentOrder) =>
                currentOrder.status == "CANCELED" ||
                currentOrder.status == "CONCLUDED"
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
