import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/product/${productId}`);

        if (!response.ok) {
          throw new Error("Veri getirme hatası");
        }

        const data = await response.json();
        setSingleProduct(data);
      } catch (err) {
        console.log("veri hatası", err);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  return singleProduct ? (
    <ProductDetails singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
  ) : (
    <p>Ürün yükleniyor</p>
  );
};

export default ProductDetailsPage;
