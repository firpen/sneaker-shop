import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function loadCart() {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems((prev) => [...prev, item]);
  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clearItems = () => setItems([]);
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, setItems, addItem, removeItem, clearItems, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
