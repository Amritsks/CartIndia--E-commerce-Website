import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => alert("Product Not Found"));
  }, [id]);

  if (!product)
    return <h1 className="mt-20 text-center text-2xl">Loading Product...</h1>;

  return (
    <div className="pt-24 p-4 min-h-screen bg-gradient-to-r from-slate-400 to-red-200 flex justify-center">
      <div className="bg-gradient-to-r from-slate-400 to-red-200 shadow-xl p-6 rounded-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full max-h-[400px] object-contain bg-gray-200 rounded-lg"
        />

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-xl text-blue-700 font-semibold">₹{product.price}</p>

          <p className="italic text-gray-600">"{product.customerreview}"</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white p-3 rounded-lg w-full max-w-xs hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
