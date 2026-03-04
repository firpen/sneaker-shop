import '../css/App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About us</Link>
        <Link to="/contact">Contact</Link>
      </nav>
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

export default App;
