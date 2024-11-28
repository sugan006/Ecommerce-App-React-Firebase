import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className="bg-gray-800 w-full h-20 flex items-center justify-between px-4">
      <div className="flex space-x-8">
        <Link to="/" className="text-white text-lg hover:text-gray-400">
          Shop
        </Link>
        <Link to="/contact" className="text-white text-lg hover:text-gray-400">
          Contact
        </Link>
      </div>
      <Link to="/cart" className="text-white">
        <FaShoppingCart size={32} />
      </Link>
    </div>
  );
};
