import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        // increase quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
    alert("Item added to Cart.");
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    alert("Item Removed from Cart.")
  };

  // Update Quantity
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  // ✅ CLEAR CART (IMPORTANT)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,  
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
