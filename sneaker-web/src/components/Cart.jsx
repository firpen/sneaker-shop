import { useSession } from "../components/useSession";
import React, { useState } from "react";
import '../css/Cart.css';

function Cart() {
    const { isLoggedIn, userInfo } = useSession();

    const [items, setItems] = useState([
        { id: 1, name: "Nike Sneakers", price: 129, img: "/sneaker1.png" },
        { id: 2, name: "Nike Sneakers", price: 129, img: "/sneaker2.png" },
        { id: 3, name: "Nike Sneakers", price: 129, img: "/sneaker3.png" }
    ]);
    const [code, setCode] = useState("");

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const shipping = 5;

    // Remove item by id
    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Redeem code (simple alert)
    const redeemCode = () => {
        alert(`Code "${code}" redeemed! (not implemented)`);
    };

    // Checkout (simple alert)
    const checkout = () => {
        alert("Checkout not implemented");
    };

    return (
        <div className="cart-container">
            <div className="cart-left">
                <h2>Shopping Cart</h2>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                            </div>
                            <button className="cart-delete-btn" onClick={() => removeItem(item.id)}>X</button>
                        </div>
                    ))
                )}
                <a href="/" className="back-home">Back To Home</a>
            </div>

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
        </div>
    );
}

export default Cart;