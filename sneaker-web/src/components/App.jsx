import '../css/App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from "./Home"
import Products from "./Products"
import Product from "./Product"
import Cart from "./Cart"
import User from "./User/User"
import Register from "./Register"
import Login from "./Login"
import Admin from "./Admin/Admin"
import Inventory from "./Admin/Inventory"
import AdminProduct from "./Admin/AdminProduct"
import "../css/Navbar.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productid" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/product/:productid" element={<AdminProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navbar() {
  const location = useLocation();
  const logoSrc = location.pathname === "/" ? "Nike-Logo-White.png" : "Nike-Logo-Black.png";
  const isHome = location.pathname === "/";
  return (
    <header className="navbar-container">
      <img src={logoSrc} alt="Nike Logo" className="navbar-logo" />
      <nav className={`navbar-links${isHome ? " navbar-links-home" : ""}`}>
        <a href="/" className="navbar-link">Home</a>
        <a href="/products" className="navbar-link">Products</a>
        <a href="#" className="navbar-link">Contact</a>
        <a href="#" className="navbar-link">About Us</a>
      </nav>
    </header>
  );
}

export default App;
