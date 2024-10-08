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
import DetailOrder from "./pages/dashboard/orders/detail-order.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import PrivateRoute from "./components/template/PrivateRoute.jsx";
import AddCustomer from "./pages/dashboard/customer/add-customer.jsx";
import Setting from "./pages/dashboard/setting/index.jsx";
import Home from "./pages/app/home/index.jsx";
import AppProducts from "./pages/app/produts/index.jsx";
import Cart from "./pages/app/cart/index.jsx";
// import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
export const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              element={
                <PrivateRoute allowedJabatan={["super admin", "admin"]} />
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/products/add" element={<AddProducts />} />
              <Route
                path="/dashboard/products/edit/:id"
                element={<AddProducts />}
              />

              <Route path="/dashboard/customer" element={<Customer />} />
              <Route path="/dashboard/customer/add" element={<AddCustomer />} />

              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/orders/:id" element={<DetailOrder />} />

              <Route path="/dashboard/setting" element={<Setting />} />
            </Route>

            <Route path="/app" element={<Home />} />
            <Route path="/app/products" element={<AppProducts />} />
            <Route path="/app/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  </AuthProvider>
);
