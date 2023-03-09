import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessProfile() {
  const [form, setForm] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");

        setForm(response.data);
        setisLoading(false);
        console.log(responseOrders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    context.setLoggedInUser(null);
    console.log("I am here");
    navigate("/");
  }

  return (
    <div>
      <BusinessNavBar />
      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your profile here
        </h1>
        <img src={form.picture}></img>
        <div className="justify-evenly flex flex-row flex-nowrap gap-4 flex-wrap w-11/12 border-t border-t-indigo-800 mx-auto box-border p-6">
          <p>{form.name}</p>
          <p>{form.email}</p>
          <p>{form.type}</p>
          <p>{form.businessType}</p>
          <p>{form.address}</p>
          <p>{form.neighborhood}</p>
          <p>{form.cnpj}</p>
          <p>{form.contactPhone}</p>

          <div className="flex flex-row justify-center items-center gap-10">
            <Link to={"/business/admin/edit"}>
              <button className="btn-indigo">Edit</button>
            </Link>

            <button onClick={handleLogOut} type="submit" className="btn-indigo">
              Log out
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
