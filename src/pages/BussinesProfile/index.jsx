import { useState, useEffect } from "react";
import { api } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessProfile() {
  const [form, setForm] = useState([]);
  const [isLoading, setisLoading] = useState(true),
    navigate = useNavigate(),
    context = useContext(AuthContext);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");

        setForm(response.data);
        setisLoading(false);
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
    <div className="min-h-screen">
      <BusinessNavBar />
      <section className="w-screen flex flex-col items-center">
        <h1 className="font-semibold mb-4 text-3xl text-indigo-900">
          Your profile here
        </h1>
        <img
          src={form.picture}
          className="w-56 h-56 rounded-full mb-5 border-4 border-black"
        />
        <div className="justify-evenly flex flex-row flex-wrap gap-4 flex-wrap w-11/12 border-t border-t-indigo-800 mx-auto box-border p-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Name</p>
            <p className="text-sm">{form.name}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Email</p>
            <p className="text-sm">{form.email}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Type</p>
            <p className="text-sm">{form.type}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Business Type</p>
            <p className="text-sm">{form.businessType}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Address</p>
            <p className="text-sm">{form.address}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Neighborhood</p>
            <p className="text-sm">{form.neighborhood}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">CNPJ</p>
            <p className="text-sm">{form.cnpj}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-semibold text-lg">Contact Phone</p>
            <p className="text-sm">{form.contactPhone}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-10 mt-2">
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
