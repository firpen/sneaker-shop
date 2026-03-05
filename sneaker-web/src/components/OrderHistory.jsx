import { useState, useEffect } from "react";
import { useSession } from "./useSession";
import "../css/OrderHistory.css";

function OrderHistory() {
  const { isLoggedIn } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:8080/api/orders", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>Du måste vara inloggad för att se din orderhistorik.</p>;
  }

  return (
    <div className="order-history">
      <h1>Order history</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Ordernummer</th>
            <th>Datum</th>
            <th className="summa">Summa</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{new Date(order.createdAt).toLocaleDateString('sv-SE')}</td>
              <td className="summa">{order.totalAmount} kr</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}

export default OrderHistory;
