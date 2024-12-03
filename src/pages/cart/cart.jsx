import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const { currentUser } = useContext(AuthContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      checkout();
      navigate("/checkout");
    }
  };

  return (
    <div className="cart max-w-screen-lg mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart Items</h1>
      </div>

      <div className="cart-items mb-8">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-gray-700 mb-4">
            Subtotal: <span className="text-green-600">${totalAmount}</span>
          </p>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart mt-12 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Your Shopping Cart is Empty</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white mt-4 py-4 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Explore the Shop
          </button>
        </div>
      )}
    </div>
  );
};

