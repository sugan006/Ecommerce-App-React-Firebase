import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
  const { id, productName, price, description, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="relative w-full mb-4" style={{ aspectRatio: '1' }}>
        <img
          src={productImage}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="description text-center">
        <p className="font-bold text-lg text-gray-800 mb-2">{productName}</p>
        <p className="text-xl font-semibold text-green-600">${price}</p>
        <p className="text-sm mt-2">{description}</p> 
      </div>
      <button
        className={`w-full py-2 mt-4 rounded-lg transition duration-300 ${
          cartItemCount > 0
            ? "bg-green-300 text-gray-700 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
        onClick={() => addToCart(id)}
        disabled={cartItemCount > 0} 
      >
        {cartItemCount > 0 ? "Added" : "Add To Cart"}
      </button>
    </div>
  );
  
};
