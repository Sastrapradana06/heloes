import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import Products from "./pages/dashboard/products/index.jsx";
import AddProducts from "./pages/dashboard/products/add-products.jsx";
import Customer from "./pages/dashboard/customer/index.jsx";
import Orders from "./pages/dashboard/orders/index.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/products/add" element={<AddProducts />} />

        <Route path="/dashboard/customer" element={<Customer />} />
        <Route path="/dashboard/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
