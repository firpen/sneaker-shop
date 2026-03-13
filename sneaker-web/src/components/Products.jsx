import React, { useState, useEffect } from "react";
import "../css/Products.css";
import { useNavigate} from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
      fetch("http://localhost:8080/api/products", {
        credentials: "include"
      })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <p>Laddar produkter...</p>;
  if (error) return <p>Något gick fel: {error}</p>;

  const categories = [...new Set(products.map(p => p.category?.name).filter(Boolean))];

  let filtered = products.slice();
  if (category) filtered = filtered.filter(p => p.category?.name === category);
  if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);

  const ITEMS_PER_PAGE = 20;
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1 ) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

 return (
    <div className="products-page">
      <div className="products-header-row">
        <h1 className="products-title">All Sneakers</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <select
            id="category-select"
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1); }}
            className="products-select products-sort-select"
          >
            <option value="">Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            id="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="products-select products-sort-select"
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="products-grid products-grid-4">
        {paginated.length === 0 && <div className="products-empty">No products found.</div>}
        {paginated.map(product => (
          <div
            className="shop-icon-card"
            key={product.productId}
            onClick={() => navigate(`/product/${product.productId}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`http://localhost:5050/images/${product.img}` || "nike-air-force.png"}
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
      {pageCount > 1 && (
        <div className="products-pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page === pageCount}>&gt;</button>
        </div>
      )}
    </div>
  );
}

export default Products;
