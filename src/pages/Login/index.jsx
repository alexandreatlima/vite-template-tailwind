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

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      navigate("/discover");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4 ">Login</h1>

      <div class="flex justify-center ">
        <form onSubmit={handleSumit}>
          <div class="flex flex-col chat-notification-title">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold
      text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-indigo-600"
          >
            Entrar!
          </button>
        </form>
      </div>
    </>
  );
}
