import { useContext } from "react";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext.jsx";
import { useNavigate } from "react-router-dom";

export function CreateOrder(props) {
  const { product } = props,
    context = useContext(AuthContext),
    navigate = useNavigate();

  console.log(`Context: ${context}`);
  async function handleClick() {
    try {
      const newOrder = await api.post("/api/order/create", {
        client: context.loggedInUser,
        business: product.creator._id,
        product: product._id,
        withdraw: product.expirationDate,
      });
      console.log(`newOrder: ${newOrder}`);
      navigate(`/user/viewOrder/${newOrder.data._id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-row justify-center mt-2.5">
      <button
        className="btn-indigo shadow-indigo-800 shadow-lg"
        onClick={handleClick}
      >
        Confirm order!
      </button>
    </div>
  );
}
