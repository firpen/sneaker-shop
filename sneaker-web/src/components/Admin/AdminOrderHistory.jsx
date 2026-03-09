import { useState, useEffect } from "react";

const STATUS_OPTIONS = ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"];

function AdminOrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/admin/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const updateStatus = (orderId, status) => {
    fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    }).then(() => {
      setOrders(
        orders.map((o) =>
          o.orderId === orderId ? { ...o, status: status } : o,
        ),
      );
    });
  };

  const cancelOrder = (orderId) => {
    fetch(`http://localhost:8080/api/orders/${orderId}/cancel`, {
      method: "PUT",
      credentials: "include",
    }).then(() => {
      setOrders(
        orders.map((o) =>
          o.orderId === orderId ? { ...o, status: "CANCELLED" } : o,
        ),
      );
    });
  };

  return (
    <div className="order-history">
      <h1>Admin - Alla orders</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Ordernummer</th>
            <th>Kund</th>
            <th>Produkter</th>
            <th>Datum</th>
            <th>Summa</th>
            <th>Status</th>
            <th>Åtgärd</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                {order.user.firstName} {order.user.lastName}
              </td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item.orderItemId}>
                    {item.productVariant.product.name} -{" "}
                    {item.productVariant.color} - Size{" "}
                    {item.productVariant.size} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString("sv-SE")}</td>
              <td>{order.totalAmount} kr</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.orderId, e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  onClick={() => cancelOrder(order.orderId)}
                  disabled={order.status === "CANCELLED"}
                >
                  Makulera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderHistory;
