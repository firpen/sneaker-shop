import React, { useState, useEffect } from "react";
import "../../css/Inventory.css";

function Inventory() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Helper to get product id
    const getProductId = (product) => product.productId;

    // Fetch products from inventory endpoint
    const fetchProducts = () => {
        setLoading(true);
        fetch("http://localhost:8080/inventory", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setProducts(Array.isArray(data) ? data : []);
                setAllProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setProducts([]);
                setAllProducts([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim() === "") {
            setProducts(allProducts);
        } else {
            setProducts(
                allProducts.filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
    };

    // Handle quantity change
    const handleQuantityChange = async (id, value) => {
        const qty = parseInt(value, 10);
        if (isNaN(qty) || qty < 0) return;
        setLoading(true);
        try {
            await fetch(`http://localhost:8080/inventory/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stockQty: qty }),
                credentials: "include"
            });
        } catch (e) {
            // Optionally show error
        }
        fetchProducts();
    };

    return (
        <div className="inventory-page">
            <div className="inventory-header">
                <form className="inventory-search-form" onSubmit={handleSearch}>
                    <input
                        className="inventory-search-input"
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="inventory-search-btn" type="submit">
                        Search
                    </button>
                </form>
            </div>
            {loading && <div style={{ textAlign: 'center', margin: '20px' }}>Loading...</div>}
            <div className="inventory-list">
                {products.map((inventory) => (
                    <div className="inventory-item" key={inventory.inventoryId}>
                        <img
                            className="inventory-item-img"
                            src={inventory.productVariant?.product?.img || "/sneaker2.png"}
                            alt={inventory.productVariant?.product?.name || "Product"}
                        />
                        <span className="inventory-item-name">{inventory.productVariant?.product?.name || "Unnamed product"}</span>
                        <div className="quantity-label-changer" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '120px' }}>
                            <span className="quantity-label" style={{ marginBottom: '4px', textAlign: 'center', width: '100%' }}>Quantity:</span>
                            <div className="quantity-control">
                                <button
                                    className="productQuantity"
                                    onClick={() => handleQuantityChange(inventory.inventoryId, inventory.stockQty - 1)}
                                    disabled={loading || inventory.stockQty <= 0}
                                >-</button>
                                <span className="quantity-display">{inventory.stockQty}</span>
                                <button
                                    className="productQuantity"
                                    onClick={() => handleQuantityChange(inventory.inventoryId, inventory.stockQty + 1)}
                                    disabled={loading}
                                >+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
