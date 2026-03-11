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

    // Add to cart
    const addToCart = () => {
        if (!size) {
            alert("Please select a size");
            return;
        }
        addItem({
            id: Date.now(),
            name: selectedItem.name,
            price: selectedItem.price,
            img: selectedItem.img,
            color,
            size,
        });
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
                <button onClick={addToCart} className="add-cart-btn">
                    Add to Cart
                </button>
            </div>
        </section>
    );
}

export default Product;