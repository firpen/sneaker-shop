import React, { useState } from "react";
import "../css/Products.css";
import { useNavigate } from "react-router-dom";

const PRODUCTS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: "Nike Air Force",
  price: 120,
  category: ["Lifestyle", "Running", "Basketball"][i % 3],
}));

const unique = (arr, key) => [...new Set(arr.map(item => item[key]))];

function Products() {
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  let filtered = PRODUCTS.slice();
  if (category) filtered = filtered.filter(p => p.category === category);
  if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);

  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="products-page">
      <div className="products-header-row">
        <h1 className="products-title">All Sneakers</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select id="category-select" value={category} onChange={e => setCategory(e.target.value)} className="products-select products-sort-select">
            <option value="">Category</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Running">Running</option>
            <option value="Basketball">Basketball</option>
          </select>
          <select id="sort-select" value={sort} onChange={e => setSort(e.target.value)} className="products-select products-sort-select">
            <option value="" className="products-sort-label">Sort By</option>
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
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src="nike-air-force.png" alt={product.name} className="shop-icon-img" />
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
