import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/auth-context";
import { ShopContextProvider } from "./context/shop-context";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout"
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ShopContextProvider>
          <Navbar />
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeButton
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ShopContextProvider>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    if (!currentUser) {
      if (currentUser && (window.location.pathname === "/signin" || window.location.pathname === "/signup")) {
        navigate("/");
      }
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={!currentUser ? <Signin /> : <Checkout />} />
      <Route path="/signup" element={!currentUser ? <Signup /> : <Shop />} />
      <Route path="/signin" element={!currentUser ? <Signin /> : <Shop />} />
    </Routes>
  );
}

export default App;