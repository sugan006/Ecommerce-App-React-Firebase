import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { FaTrash } from "react-icons/fa";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, reduceFromCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  return (
    <div className="cartItem flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-xl transition duration-300">
      <div className="relative w-full md:w-1/4 mb-4 md:mb-0">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-auto object-contain rounded-lg shadow-md"
        />
      </div>

      <div className="description flex-1 px-6 text-left">
        <p className="font-semibold text-xl text-gray-800 mb-2">{productName}</p>
        <p className="text-md text-gray-600 mb-2">Unit Price: <span className="text-gray-800 font-semibold">${price}</span></p>
        <p className="text-md text-gray-600 mb-4">Total Price: <span className="text-gray-800 font-semibold">${price * cartItems[id]}</span></p>

        <div className="countHandler flex items-center justify-start gap-4">
          <button
            onClick={() => reduceFromCart(id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            -
          </button>
          <input
            type="number"
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            className="w-16 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            onClick={() => addToCart(id)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="removeItem mt-4 md:mt-0 md:ml-4">
        <button
          onClick={() => removeFromCart(id)}
          className="bg-red-700 text-white p-3 rounded-full hover:bg-red-800 transition duration-300"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};
