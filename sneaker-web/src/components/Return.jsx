import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "./CartContext";

const apiBaseUrl = "http://localhost:8080";

async function readErrorMessage(response, fallbackMessage) {
  const text = await response.text();
  return text || fallbackMessage;
}

function Return() {
  const [searchParams] = useSearchParams();
  const { clearItems } = useCart();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setMessage("Missing Stripe session id.");
      return;
    }

    fetch(`${apiBaseUrl}/api/stripe/session-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionID: sessionId }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await readErrorMessage(response, "Could not verify payment"));
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "complete") {
          clearItems();
          setStatus("success");
          setMessage("Payment complete. Your checkout was successful.");
          return;
        }

        setStatus("pending");
        setMessage(`Payment status: ${data.status}`);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, [clearItems, searchParams]);

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h3>{status === "success" ? "Checkout Complete" : "Checkout Status"}</h3>
        <p>{message}</p>
        <Link to={status === "success" ? "/order-history" : "/cart"} className="checkout-btn" style={{ display: "inline-block", textAlign: "center", textDecoration: "none" }}>
          {status === "success" ? "Go to Orders" : "Back to Cart"}
        </Link>
      </div>
    </div>
  );
}

export default Return;