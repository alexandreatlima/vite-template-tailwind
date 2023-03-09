import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessForm() {
  const [form, setForm] = useState({
      picture: "",
      name: "",
      price: 0,
      description: "",
      expirationDate: "",
    }),
    [img, setImg] = useState(""),
    navigate = useNavigate();

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);
      const response = await api.post("/api/uploadImage", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const imgURL = await handleUpload();
      await api.post("/api/product/create", {
        ...form,
        picture: imgURL,
        price: form.price * 100,
      });
      console.log("I have just submitted the form.");
      navigate("/business/admin");
    } catch (error) {
      console.log(error);
      // Colocar toast avisando que o produto não foi salvo e que todos os campos precisam ser preenchidos para cirar um novo
      // produto.
    }
  }

  return (
    <div>
      <BusinessNavBar />
      <div className="container">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <img src={form.picture}></img>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Your Product Picture:
                </h3>
                <input
                  name="picture"
                  type="file"
                  id="picture"
                  onChange={handleImage}
                  required
                />
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
                      onChange={handleChange}
                      value={form.name}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price (R$):
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.price}
                      type="number"
                      step="0.01"
                      name="price"
                      id="price"
                      autoComplete="given-price"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description:
                  </label>
                  <div className="mt-1">
                    <textarea
                      onChange={handleChange}
                      value={form.description}
                      name="description"
                      id="description"
                      autoComplete="given-description"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.expirationDate}
                      type="date"
                      name="expirationDate"
                      id="expirationDate"
                      autoComplete="given-expirationDate"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="btn-indigo bg-green-500"
                      >
                        Create new Product!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
