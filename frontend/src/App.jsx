import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin/Admin";
import SuccessPayment from "./pages/SuccessPayment";
import ProductList from "./pages/Admin/ProductList";
import ProductEdit from "./pages/Admin/ProductEdit";
import ProductNew from "./pages/Admin/ProductNew";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Orders from "./pages/Admin/Orders";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/search/:keyword" element={<SearchResult />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin only */}
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="admin/products/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/products/create" element={<ProductNew />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>

        {/* Registerd users only */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPayment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
