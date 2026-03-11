import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    { id: 1, name: "Nike Sneakers", price: 129, img: "/sneaker1.png" },
    { id: 2, name: "Nike Sneakers", price: 129, img: "/sneaker2.png" },
    { id: 3, name: "Nike Sneakers", price: 129, img: "/sneaker3.png" },
  ]);

  const addItem = (item) => setItems((prev) => [...prev, item]);
  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, setItems, addItem, removeItem, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
