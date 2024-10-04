// src/components/AllProducts.js
import React from "react";
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";
import { FaStar } from "react-icons/fa6";

const AllProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
  },
  {
    id: 2,
    img: Img2,
    title: "Women Western",
    rating: 4.5,
    color: "Red",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    rating: 4.7,
    color: "brown",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
  },
  {
    id: 5,
    img: Img2,
    title: "Fashion T-Shirt",
    rating: 4.5,
    color: "Pink",
  },
  // Add more products as needed
];

const AllProducts = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {AllProductsData.map((data) => (
            <div
              key={data.id}
              className="border rounded-md p-4 shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-[250px] w-full object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-lg">{data.title}</h3>
              <p className="text-sm text-gray-600">{data.color}</p>
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-400" />
                <span>{data.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
