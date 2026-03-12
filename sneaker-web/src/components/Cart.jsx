import { useSession } from "../components/useSession";
import React, { useMemo, useState } from "react";
import '../css/Cart.css';
import { useCart } from "./CartContext";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY?.trim();
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;
const apiBaseUrl = "http://localhost:8080";

async function readErrorMessage(response, fallbackMessage) {
    const text = await response.text();
    return text || fallbackMessage;
}

function Cart() {
    const { isLoggedIn } = useSession();
    const { items, removeItem, checkoutItems } = useCart();
    const [code, setCode] = useState("");
    const [checkoutError, setCheckoutError] = useState("");
    const [showCheckout, setShowCheckout] = useState(false);

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const shipping = 5;
    const stripeReady = Boolean(stripePublishableKey);

    const fetchClientSecret = useMemo(() => {
        return async () => {
            const response = await fetch(`${apiBaseUrl}/api/stripe/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: checkoutItems.map((item) => ({
                        name: `${item.name}${item.size ? ` Size ${item.size}` : ""}${item.color ? ` ${item.color}` : ""}`,
                        price: item.price,
                        quantity: item.quantity
                    }))
                })
            });

            if (!response.ok) {
                throw new Error(await readErrorMessage(response, "Could not start checkout"));
            }

            const data = await response.json();
            if (!data?.clientSecret) {
                throw new Error("Stripe client secret is missing");
            }

            return data.clientSecret;
        };
    }, [checkoutItems]);

    // Redeem code (simple alert)
    const redeemCode = () => {
        alert(`Code "${code}" redeemed! (not implemented)`);
    };

    const checkout = async () => {
        if (!isLoggedIn) {
            setCheckoutError("You need to log in before checkout.");
            return;
        }

        if (!stripeReady) {
            setCheckoutError("Missing REACT_APP_STRIPE_PUBLISHABLE_KEY in frontend environment.");
            return;
        }

        if (checkoutItems.length === 0) {
            setCheckoutError("Your cart is empty.");
            return;
        }

        setCheckoutError("");
        setShowCheckout(true);
    };

    return (
        <div className="cart-container">
            <div className="cart-left">
                <h2>Shopping Cart</h2>
                {checkoutError && <p>{checkoutError}</p>}
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                {item.size && <p>Size: {item.size}</p>}
                            </div>
                            <button className="cart-delete-btn" onClick={() => removeItem(item.id)}>X</button>
                        </div>
                    ))
                )}
                <a href="/" className="back-home">Back To Home</a>
            </div>

            {!showCheckout && (
                <div className="cart-summary">
                    <h3>Summary</h3>
                    <div className="summary-row">
                        <span>Items: {items.length}</span>
                        <span>${total}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>${shipping}</span>
                    </div>
                    <div className="summary-row">
                        <span>Redeem Code</span>
                    </div>
                    <input
                        className="summary-input"
                        type="text"
                        placeholder="Enter Your Code"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                    />
                    <button className="apply-btn" onClick={redeemCode}>Apply</button>
                    <div className="summary-bottom">
                        <div className="summary-row">
                            <span>Total Price</span>
                            <span>${total + shipping}</span>
                        </div>
                        <hr className="summary-divider" />
                        <button className="checkout-btn" onClick={checkout}>Checkout</button>
                    </div>
                </div>
            )}
            {showCheckout && stripeReady && stripePromise && (
                <div className="cart-summary">
                    <h3>Checkout</h3>
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                </div>
            )}
        </div>
    );
}

export default Cart;