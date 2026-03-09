import UserMenu from "./UserMenu";
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
import OrderHistory from "./OrderHistory"
import { useSession } from "./useSession"

function App() {
  const { isLoggedIn, userInfo, adminAccess } = useSession();

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
        <Route path="/admin" element={ !adminAccess ? <h1>404</h1> : <Admin userInfo={userInfo} />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/product/:productid" element={<AdminProduct />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

function Navbar() {
  const location = useLocation();
  const logoSrc = process.env.PUBLIC_URL + "/" + (location.pathname === "/" ? "Nike-Logo-White.png" : "Nike-Logo-Black.png");
  const isHome = location.pathname === "/";
  return (
    <header className="navbar-container">
      <img src={logoSrc} alt="Nike Logo" className="navbar-logo" />
      <nav className={`navbar-links${isHome ? " navbar-links-home" : ""}`}>
        <a href="/" className="navbar-link">Home</a>
        <a href="/products" className="navbar-link">Products</a>
        <a href="#" className="navbar-link">Contact</a>
        <a href="#" className="navbar-link">About Us</a>
        <UserMenu />
      </nav>
    </header>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-divider" />
      <div className="footer-content footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">NIKE</div>
          <div className="footer-desc">Descriptive line about what your company does.</div>
        </div>
        <div className="footer-links-col">
          <div className="footer-links-title">Features</div>
          <a href="#" className="footer-link">Core features</a>
          <a href="#" className="footer-link">Pro experience</a>
          <a href="#" className="footer-link">Integrations</a>
        </div>
        <div className="footer-links-col">
          <div className="footer-links-title">Learn more</div>
          <a href="#" className="footer-link">Blog</a>
          <a href="#" className="footer-link">Case studies</a>
          <a href="#" className="footer-link">Customer stories</a>
        </div>
        <div className="footer-links-col">
          <div className="footer-links-title">Support</div>
          <a href="#" className="footer-link">Contact</a>
          <a href="#" className="footer-link">Support</a>
          <a href="#" className="footer-link">Legal</a>
        </div>
      </div>
    </footer>
  );
}

function AppWithFooter() {
  return (
    <>
      <App />
      <Footer />
    </>
  );
}

export default AppWithFooter;
