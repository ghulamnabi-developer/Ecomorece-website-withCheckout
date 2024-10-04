// src/components/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveFromCart = (itemId) => {
    const confirmRemoval = window.confirm('Are you sure you want to remove this item from your cart?');
    if (confirmRemoval) {
      removeFromCart(itemId);
    }
  };

  const checkout = () => {
    // Navigate to the checkout page with the total amount as state
    navigate('/checkout', { state: { totalAmount } });
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between bg-white p-4 rounded-lg shadow-sm border-b">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-gray-600">Size: {item.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveFromCart(item.id)} 
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          
          {/* Total Amount */}
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">Total Amount: ${totalAmount.toFixed(2)}</h2>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <button 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 w-full"
              onClick={checkout} // Navigate to checkout
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
