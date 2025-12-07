import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function OrderHistory() {
  
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const userId = user ? user.id : null; // same user id
    axios
      .get(`${BACKEND_URL}/api/orders/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log("Order fetch error:", err));
  }, []);

  if (orders.length === 0)
    return <h1 className="pt-24 text-center text-3xl">No Orders Found</h1>;

  return (
    <div className="pt-24 p-6 min-h-screen bg-gradient-to-r from-slate-400 to-red-200">
      <h1 className="text-3xl font-bold mb-5">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-gradient-to-r from-slate-400 to-red-200 p-4 rounded shadow-lg mb-4">
          <h2 className="font-semibold">Order ID: {order._id}</h2>
          <p>Total: ₹{order.totalAmount}</p>

          <h3 className="mt-3 font-bold">Items:</h3>
          {order.items.map((item) => (
            <div key={item._id} className="ml-5">
              <p>
                {item.name} × {item.qty}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
