import { useSession } from "../components/useSession";
import React, { useState, useEffect } from "react";
import '../css/Product.css';
import { useCart } from "./CartContext";
import {useParams} from "react-router-dom";

function Product() {
    const { addItem } = useCart();
    const {productid} = useParams();
    const [product, setProduct] = useState(null);

    const [colorOptions, setColorOptions] = useState([])
    const [sizeOptions, setSizeOptions] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${productid}`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setColorOptions([...new Set(data.productVariants.map(pv => pv.color))])
            setSizeOptions([...new Set(data.productVariants.map(pv => pv.size))])
            setProduct(data)
        })
    }, [productid])


    const [color, setColor] = useState("White");
    const [size, setSize] = useState("");
    
    // Select product quantity
    const [quantity, setQuantity] = useState(1);
    
    if (!product) return <p>Laddar...</p>;

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
                name: product.name,
                price: product.price,
                img: product.img,
                color,
                size,
            });
        }
    };

    return (
        <section className="pageWrap">
            <div className="imgContainer">
                <img alt={product.name} className="sneakers" src={`http://localhost:8080/images/${product.img}`} />
            </div>
            <div className="infoContainer">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <div className="color-select">
                    <div className="color-label">Color: {color}</div>
                    <div className="color-options">
                        {colorOptions.map(opt => (
                            <label key={opt} className="color-label-item">
                                <input
                                    type="radio"
                                    name="color"
                                    value={opt}
                                    checked={color === opt}
                                    onChange={() => setColor(opt)}
                                    style={{ display: 'none' }}
                                />
                                <span className={`color-circle ${opt.toLowerCase()}${color === opt ? ' selected' : ''}`}></span>
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