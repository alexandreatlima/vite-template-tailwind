import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedBusinessRoute(props) {
  const { component: Component } = props;
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const parsedUser = JSON.parse(loggedInUser || '""');
  useEffect(() => {
    console.log(parsedUser);
    try {
      if (parsedUser.user.type !== "BUSINESS") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }, []);
  return <Component />;
}
