import { ClientNavBar } from "../../components/ClientNavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NameLogo } from "../../components/NameLogo";
import { api } from "../../api/api";
import { ProductDetailsAndOrder } from "../../components/ProductDetailsAndOrder";

export function ClientProductDetails() {
  const params = useParams();
  const [selProduct, setSelProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/api/product/get/${params.idMagic}`);
        console.log(response.data);
        setSelProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, []);

  return (
    <div className="min-h-screen">
      <ClientNavBar />
      <NameLogo product={selProduct} />
      <ProductDetailsAndOrder product={selProduct} />
    </div>
  );
}
