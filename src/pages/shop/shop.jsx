import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import { FaSearch } from "react-icons/fa";

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter products based on selected category and search term
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearchTerm =
      product.productName?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="shop pt-20 px-4 py-8 max-w-screen-xl mx-auto">
      <div className="category-filter sticky top-16 z-10 bg-white shadow-md mb-8 p-3">
        <div className="flex justify-center space-x-4 py-4">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`${selectedCategory === "All" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              } py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition duration-300`}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryChange("Tech")}
            className={`${selectedCategory === "Tech" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              } py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition duration-300`}
          >
            Tech
          </button>
          <button
            onClick={() => handleCategoryChange("Dress")}
            className={`${selectedCategory === "Dress" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              } py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition duration-300`}
          >
            Dress
          </button>
        </div>
        <div className="search-bar mb-8 flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
          >
            <FaSearch size={20} />
          </span>
        </div>
      </div>
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-lg text-gray-600">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};