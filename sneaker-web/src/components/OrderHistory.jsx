import { useState, useEffect } from "react";
import { useSession } from "./useSession";

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
    <div>
      <h1>Order history</h1>
      <table>
        <thead>
          <tr>
            <th>Ordernummer</th>
            <th>Datum</th>
            <th>Summa</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalAmount} kr</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
