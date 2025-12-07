import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } =
    useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const { products } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  // Place order logic
  const placeOrder = async () => {
    try {
      const orderData = {
        userId: user ? user.id : null,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalAmount: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      };

      await axios.post(`${BACKEND_URL}/api/orders`, orderData);

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setTimeout(() => clearCart(), 3000);
    } catch (error) {
      console.error("Order error:", error);
      alert("Order failed!");
    }
  };

  if (cart.length === 0)
    return (
      <div className="bg-gradient-to-r from-slate-400 to-red-200  min-h-screen">
        <h1 className="pt-24 text-center text-3xl">Cart is Empty, Order Something.</h1>
        {products.length === 0 ? (
          <p className="text-center mt-4">No Products Found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4 px-4">
            {products.map((p) => (
              <Link key={p._id} to={`/product/${p._id}`}>
                <div className="border p-4 bg-white rounded-xl shadow-md flex flex-col">
                  <img
                    className="h-40 w-full object-contain rounded-lg bg-slate-100"
                    src={p.imageUrl}
                    alt={p.name}
                  />
                  <h3 className="mt-2 text-center font-semibold">{p.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <div className="pt-24 p-4 min-h-screen bg-gradient-to-r from-slate-400 to-red-200 max-w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Your Shopping Cart</h1>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-r from-slate-300 to-red-100 rounded-lg border shadow-lg flex flex-col md:flex-row items-center md:items-start gap-4 p-4"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full max-w-xs h-40 object-contain bg-gray-200 rounded"
            />

            <div className="flex-1 w-full">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-700 mt-1">₹{item.price}</p>

              {/* Qty Controls */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() =>
                    updateQty(item._id, Math.max(1, item.qty - 1))
                  }
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="text-lg">{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, item.qty + 1)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition mt-4 md:mt-0"
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center md:justify-start mt-10">
        <button
          onClick={placeOrder}
          className="bg-blue-600 text-white p-3 rounded-lg w-48 hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center w-full max-w-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-600">🎉 Order Placed!</h2>
            <p className="text-gray-700 mt-2">
              Thank you for ordering with CartꞮndia!
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
