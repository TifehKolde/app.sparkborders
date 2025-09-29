// src/context/CartContext.jsx
import { createContext, useState, useMemo, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ Load initial cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [checkoutData, setCheckoutData] = useState(null);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Calculate total dynamically
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // ✅ Add item (increase qty if already in cart)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const fullProduct = {
        ...product,
        quantity: product.quantity || 1,
        distributorId: product.distributorId || null,
        distributorName: product.distributorName || null,
        manufacturerId: product.manufacturerId || null,
        manufacturerName: product.manufacturerName || null,
      };

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + fullProduct.quantity }
            : item
        );
      }

      return [...prev, fullProduct];
    });
  };

  // ✅ Increase / Decrease item quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ✅ Remove single / all
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const removeAll = () => setCart([]);

  const value = {
    cart,
    total,
    checkoutData,
    setCheckoutData,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    removeAll,
    setCart, // 🔑 expose setCart for full override if needed
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ✅ Hook for easy access
export const useCart = () => useContext(CartContext);
