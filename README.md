# Sneaker Shop

## Project Structure

- **sneaker-api/**  
  Backend (Java, Quarkus) – handles products, users, orders, inventory, etc.
- **sneaker-web/**  
  Frontend (React) – user interface for shop, cart, admin, order history, etc.

---

## Backend – sneaker-api

### Technology
- Java 21, Quarkus
- REST API (Resteasy)
- JWT authentication
- Hibernate ORM (database)
- Stripe integration

### Key Endpoints
- **/api/products**  
  GET, POST, PUT, DELETE – manage products
- **/api/inventory**  
  GET, POST, PUT – manage inventory/quantity
- **/api/auth**  
  POST /login – login
- **/api/users**  
  GET, POST, DELETE – user management
- **/api/orders**  
  GET, POST – orders

### Data Models
- **Product**: Product info (name, description, price, image)
- **ProductVariant**: Variant (size, color)
- **Inventory**: Stock (stockQty, reservedQty, linked to variant)
- **User**: User (email, name, role)
- **Order**: Order and order items

### Start Backend
```bash
cd sneaker-api
./mvnw quarkus:dev
```
Backend runs at http://localhost:8080

------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Sneaker Shop – Frontend

## Overview

This is the frontend for the Sneaker Shop project, built with React.  
It provides a user interface for browsing products, managing the cart, user authentication, admin inventory management, and order history.

---

## Technology

- React 19
- React Router
- Context API (cart management)
- Stripe integration (payments)
- CSS modules

---

## Main Components

- **App.jsx**: Routing, navbar, and layout
- **Products.jsx**: Product listing page
- **Product.jsx**: Product details page
- **Cart.jsx**: Shopping cart
- **Inventory.jsx**: Admin inventory management
- **Login.jsx / Register.jsx**: User authentication
- **OrderHistory.jsx**: User order history
- **AdminOrderHistory.jsx**: Admin order history
- **UserMenu.jsx**: User dropdown menu
- **CartIcon.jsx**: Cart icon with item count

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

The app will run at http://localhost:3000

---

## Features

- Browse products and filter by category
- View product details, select size and color
- Add products to cart and manage cart items
- User registration and login
- View order history
- Admin panel for inventory management (change stock quantity)
- Stripe payment integration

---

## Configuration

- The frontend expects the backend to run at [http://localhost:8080](http://localhost:8080).
- CORS must be enabled in the backend for API requests.
- Stripe keys are managed via environment variables or backend.

---


## Folder Structure

```
src
│
├─ components
│  ├─ App.jsx
│  ├─ Products.jsx
│  ├─ Product.jsx
│  ├─ Cart.jsx
│  ├─ Inventory.jsx
│  ├─ Login.jsx
│  ├─ Register.jsx
│  ├─ OrderHistory.jsx
│  └─ ...
│  │
│  ├─ Admin
│  │  ├─ Admin.jsx
│  │  ├─ AdminOrderHistory.jsx
│  │  ├─ Inventory.jsx
│  │  └─ AdminProduct.jsx
│  │
│  └─ User
│     └─ User.jsx
│     
│
├─ css
│  ├─ App.css
│  ├─ Cart.css
│  ├─ Inventory.css
│  ├─ Product.css
│  └─ ...
│
├─ hooks
│  ├─ GetProducts.jsx
│  └─ GetCategories.jsx
│  
│
public
├─ index.html
└─ manifest.json
```

---

## Testing

Run tests with:
```bash
npm test
```

---

## Contributors

| Avatar | Name | GitHub |
|------|------|------|
| <img src="https://github.com/Luythen.png" width="50" height="50"> | **Luythen Luy** | [@Luythen](https://github.com/Luythen) |
| <img src="https://github.com/firpen.png" width="50" height="50"> | **firpen** | [@firpen](https://github.com/firpen) |
| <img src="https://github.com/ninos11.png" width="50" height="50"> | **ninos11** | [@ninos11](https://github.com/ninos11) |
| <img src="https://github.com/DilerCiftci.png" width="50" height="50"> | **Diler Ciftci** | [@DilerCiftci](https://github.com/DilerCiftci) |
