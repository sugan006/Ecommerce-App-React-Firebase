import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { ShopContext } from "../context/shop-context";
import { AuthContext } from "../context/auth-context";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, signOut } = useContext(AuthContext);
  const { cartItems } = useContext(ShopContext);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  const totalItems = getTotalCartItems();

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-20 flex items-center justify-between px-4 md:px-6 z-50 shadow-lg fixed top-0 left-0">
      <div className="flex items-center space-x-4 md:space-x-8">
        <Link to="/cart" className="relative text-white">
          <FaShoppingCart size={32} />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {totalItems}
            </span>
          )}
        </Link>

        <Link to="/" className="text-white text-2xl font-extrabold tracking-wider italic hover:text-gray-300 transition duration-300">
          Fastrack Shop
        </Link>
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="md:hidden flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaBars size={28} className="text-white cursor-pointer" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-0 right-0 bg-white w-full h-screen flex flex-col items-center justify-center space-y-6 z-50 md:hidden">
          <div className="absolute top-4 right-4 text-2xl text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes />
          </div>

          <Link to="/contact" className="text-lg text-gray-800 hover:text-gray-500 transition duration-300" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>

          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="text-lg text-gray-800 hover:text-gray-500 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-lg text-gray-800 hover:text-gray-500 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      <div className="hidden md:flex items-center space-x-6 ml-auto">
        <Link to="/contact" className="text-white text-lg hover:text-gray-300 transition duration-300">
          Contact
        </Link>

        {currentUser ? (
          <button
            onClick={handleSignOut}
            className="text-white text-lg hover:text-gray-300 transition duration-300"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="text-white text-lg hover:text-gray-300 transition duration-300">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

