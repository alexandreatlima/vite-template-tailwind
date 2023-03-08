import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

export function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
    businessType: "",
    address: "",
    neighborhood: "",
    cpf: "",
    cnpj: "",
    contactPhone: "",
  });

  const [img, setImg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // const imgURL = await handleUpload();
      await api.post("/api/user/signup", { ...form });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4 ">Sign up</h1>
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white p-4 rounded-md shadow-md w-96">
          <div class="space-y-4">
            <form onSubmit={handleSubmit}>
              <div class="flex flex-col">
                <label htmlFor="formName">Name:</label>
                <input
                  id="formName"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                />
                <label htmlFor="formEmail">E-mail:</label>
                <input
                  id="formEmail"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="formPassword">Password:</label>
                <input
                  id="formPassword"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <label htmlFor="formConfirmPassword">
                  Confirm your password:
                </label>
                <input
                  id="formConfirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <label htmlFor="formType">Type:</label>
                <input
                  id="formType"
                  type="string"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                />
                <label htmlFor="formBusiness">Business Type:</label>
                <input
                  id="formBusiness"
                  type="string"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                />
                <label htmlFor="formAdress">Adress:</label>
                <input
                  id="formAdress"
                  type="string"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
                <label htmlFor="formNeighborhood">Neighborhood:</label>
                <input
                  id="formNeighborhood"
                  type="string"
                  name="neighborhood"
                  value={form.neighborhood}
                  onChange={handleChange}
                />
                <label htmlFor="formCpf">CPF:</label>
                <input
                  id="formCpf"
                  type="string"
                  name="cpf"
                  value={form.cpf}
                  onChange={handleChange}
                />
                <label htmlFor="formCnpj">CNPJ:</label>
                <input
                  id="formCnpj"
                  type="string"
                  name="cnpj"
                  value={form.cnpj}
                  onChange={handleChange}
                />
                <label htmlFor="formContactPhone">Phone contact:</label>
                <input
                  id="formContactPhone"
                  type="string"
                  name="contactPhone"
                  value={form.contactPhone}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold
      text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
      focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-indigo-600"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
