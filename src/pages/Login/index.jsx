import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import img from "../../images/cover.jpg";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/api/user/login", form);
      setLoggedInUser({ ...response.data });
      console.log(response);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      if (response.data.user.type === "BUSINESS") {
        navigate("/business/admin");
      } else {
        navigate("/user/discover");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 pt-24">Login</h1>

      <div className="w-10/12 flex flex-col justify-center items-center m-auto">
        <form onSubmit={handleSumit}>
          <div className="flex flex-col chat-notification-title gap-6 w-72">
            <div className="flex flex-col">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-xl"
                placeholder="email"
              />
            </div>
            <div className="flex flex-col">
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-xl"
                placeholder="password"
              />
            </div>
          </div>
          <div className="mx-auto mt-12 text-center">
            <button type="submit" className="btn-indigo mx-auto text-center">
              Entrar!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
