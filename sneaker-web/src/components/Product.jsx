import { useSession } from "../components/useSession";
import React, { useState } from "react";
import '../css/Product.css';
import { useCart } from "./CartContext";

function Product() {
    const { isLoggedIn, userInfo } = useSession();
    const { addItem } = useCart();

    const [color, setColor] = useState("White");
    const [size, setSize] = useState("");
    const colorOptions = [
        { name: "White", value: "White" },
        { name: "Black", value: "Black" }
    ];
    const sizeOptions = ["39", "40", "41", "42", "43", "44"];

    // Select image based on color
    const shoeImg = color === "Black" ? "/nike-air-force-black.png" : "/nike-air-force.png";
    const selectedItem = { name: "Nike Air Force 1", price: 129, img: shoeImg, color };

    // Select product quantity
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) { setQuantity(prevCount => prevCount - 1); }
    }

    const handleIncrement = () => {
        if (quantity < 10) { setQuantity(prevCount => prevCount + 1); }
    }

    // Add to cart
    const addToCart = () => {
        if (!size) {
            alert("Please select a size");
            return;
        }
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: Date.now() + i,
                name: selectedItem.name,
                price: selectedItem.price,
                img: selectedItem.img,
                color,
                size,
            });
        }
    };

    return (
        <section className="pageWrap">
            <div className="imgContainer">
                <img alt={selectedItem.name} className="sneakers" src={selectedItem.img} />
            </div>
            <div className="infoContainer">
                <h2>{selectedItem.name}</h2>
                <p>${selectedItem.price}</p>
                <div className="color-select">
                    <div className="color-label">Color: {color}</div>
                    <div className="color-options">
                        {colorOptions.map(opt => (
                            <label key={opt.value} className="color-label-item">
                                <input
                                    type="radio"
                                    name="color"
                                    value={opt.value}
                                    checked={color === opt.value}
                                    onChange={() => setColor(opt.value)}
                                    style={{ display: 'none' }}
                                />
                                <span className={`color-circle ${opt.value.toLowerCase()}${color === opt.value ? ' selected' : ''}`}></span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="size-select">
                    <div className="size-label">Size:</div>
                    <div className="size-options">
                        {sizeOptions.map(opt => (
                            <button
                                key={opt}
                                type="button"
                                className={`size-btn${size === opt ? ' selected' : ''}`}
                                onClick={() => setSize(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="quantity-cart-group">
                    <label className="quantity-label" htmlFor="product-quantity">Quantity:</label>
                    <div className="quantity-control" id="product-quantity">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            className="productQuantity"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <div className="form-control text-center quantity-display" tabIndex={0} aria-live="polite">{quantity}</div>
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="productQuantity"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <button onClick={addToCart} className="add-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Product;