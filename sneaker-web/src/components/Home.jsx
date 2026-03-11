import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/products", {
            credentials: "include"
        })
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return res.json();
        })
        .then((data) => setProducts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Laddar produkter...</p>;
    if (error) return <p>Någon gick fel: {error}</p>;

    return (
        <div>
            <img src="home.jpg" alt="Home" className="home-image" />
            <section className="shop-icons-section">
                <h2 className="shop-icons-title">Shop Our Icons</h2>
                <div className="shop-icons-grid">
                    {products.map((product) => (
                        <div
                            className="shop-icon-card"
                            key={product.productId}
                            onClick={() => navigate(`/product/${product.productId}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={product.img}
                                alt={product.name}
                                className="shop-icon-img"
                            />
                            <div className="shop-icon-info">
                                <span className="shop-icon-name">{product.name}</span>
                                <span className="shop-icon-price">{product.price}$</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;