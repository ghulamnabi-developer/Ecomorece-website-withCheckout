// src/components/Modal.js
import React from 'react';
import { useCart } from '../context/CartContext';

const Modal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;

    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        color,
        size,
      });
      alert(`${product.name} added to cart!`);
      onClose(); // Close modal after adding to cart
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>

        <label htmlFor="quantity" className="block mt-2">Quantity:</label>
        <input type="number" id="quantity" defaultValue="1" className="border p-1 w-full" />

        <label htmlFor="color" className="block mt-2">Color:</label>
        <select id="color" className="border p-1 w-full">
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>

        <label htmlFor="size" className="block mt-2">Size:</label>
        <select id="size" className="border p-1 w-full">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>

        <button onClick={handleAddToCart} className="mt-4 w-full bg-blue-500 text-white py-2">Add to Cart</button>
      </div>
    </div>
  );
};

export default Modal;
