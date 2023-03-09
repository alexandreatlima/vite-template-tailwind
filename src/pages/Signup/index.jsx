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
    const clone = { ...form };
    if (clone.type !== "BUSINESS" && clone.type !== "CLIENT") {
      // adc toast.
      return;
    }
    if (clone.type === "BUSINESS" && clone.businessType === "Select a type") {
      // adc toast.
      return;
    }
    if (clone.type === "BUSINESS") {
      delete clone.cpf;
      delete clone.favorites;
    }
    if (clone.type === "CLIENT") {
      delete clone.businessType;
      delete clone.cnpj;
      delete clone.products;
    }
    try {
      // const imgURL = await handleUpload();
      await api.post("/api/user/signup", { ...clone });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Sign up
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  and then confirm your email to start saving food{" "}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="formName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.contactPhone}
                      onChange={handleChange}
                      type="text"
                      name="contactPhone"
                      id="contactPhone"
                      autoComplete="family-phone"
                      className="focus:ring-inest block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.email}
                      onChange={handleChange}
                      id="formEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      id="formPassword"
                      autoComplete="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm your password:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      name="confirmPassword"
                      id="formConfirmPassword"
                      autoComplete="confirmPassword"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type:
                  </label>
                  <div className="mt-1">
                    <select
                      value={form.type}
                      onChange={handleChange}
                      id="formType"
                      name="type"
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>Select a type</option>
                      <option>BUSINESS</option>
                      <option>CLIENT</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="businessType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Business type:
                  </label>
                  <div className="mt-1">
                    <select
                      value={form.businessType}
                      onChange={handleChange}
                      id="formBusiness"
                      name="businessType"
                      autoComplete="business-type"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option>Select a type</option>
                      <option>BAKERY</option>
                      <option>RESTAURANT</option>
                      <option>BAR</option>
                      <option>SUPERMARKET/GROCERY STORE</option>
                      <option>OTHER</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.address}
                      onChange={handleChange}
                      type="text"
                      name="address"
                      id="formAddress"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="neighbordhood"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Neighbordhood:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.neighborhood}
                      onChange={handleChange}
                      type="text"
                      name="neighborhood"
                      id="formNeighborhood"
                      autoComplete="address-neighborhood"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CPF:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.cpf}
                      onChange={handleChange}
                      type="text"
                      name="cpf"
                      id="formCpf"
                      autoComplete="cpf"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="cnpj"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CNPJ:
                  </label>
                  <div className="mt-1">
                    <input
                      value={form.cnpj}
                      onChange={handleChange}
                      type="text"
                      name="cnpj"
                      id="formCnpj"
                      autoComplete="cnpj"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
