import React, { useState, useEffect } from "react";
import "../../css/Inventory.css";

function Inventory() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Helper to get product id
    const getProductId = (product) => product.productId;

    // Fetch products from backend
    const fetchProducts = () => {
        setLoading(true);
        fetch("http://localhost:8080/api/products", { credentials: "include" })
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

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        setLoading(true);
        await fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE", credentials: "include" });
        fetchProducts();
    };

    // Edit product
    const handleEdit = async (id) => {
        const product = products.find(p => getProductId(p) === id);
        const newName = prompt("Edit product name:", product.name);
        if (newName && newName.trim() !== "") {
            setLoading(true);
            // Build a Product object matching backend expectations
            const updatedProduct = {
                productId: product.productId,
                name: newName,
                description: product.description,
                price: product.price,
                category: typeof product.category === 'object' ? product.category : { categoryId: product.category },
                isActive: product.isActive,
                img: product.img
            };
            await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
                credentials: "include"
            });
            fetchProducts();
        }
    };

    // Add product
    const handleAdd = async () => {
        const newName = prompt("Enter product name:");
        if (newName && newName.trim() !== "") {
            setLoading(true);
            await fetch(`http://localhost:8080/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName,
                    description: "A classic sneaker",
                    price: 120,
                    category: "1",
                    isActive: true,
                    productVariant: [{ size: 42, color: "White" }],
                    img: "/sneaker2.png"
                }),
                credentials: "include"
            });
            fetchProducts();
        }
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
                    <button className="inventory-add-btn" type="button" onClick={handleAdd} style={{ marginLeft: '15px', background: '#4ca04c', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 25px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>Add Product</button>
                </form>
            </div>
            {loading && <div style={{ textAlign: 'center', margin: '20px' }}>Loading...</div>}
            <div className="inventory-list">
                {products.map((product) => (
                    <div className="inventory-item" key={getProductId(product)}>
                        <img
                            className="inventory-item-img"
                            src={product.img || "/sneaker2.png"}
                            alt={product.name}
                        />
                        <span className="inventory-item-name">{product.name}</span>
                        <div className="inventory-item-actions">
                            <button className="inventory-delete-btn" onClick={() => handleDelete(getProductId(product))}>Delete</button>
                            <button className="inventory-edit-btn" onClick={() => handleEdit(getProductId(product))}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inventory;
