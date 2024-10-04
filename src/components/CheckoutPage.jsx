// src/components/CheckoutPage.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q2rwVGBop2eLpBQIem0BojnX3wajyG8eIddug3sRwikAXxXqHU2RK8COacViRmOGZbIBJyM2ZXBjyMafthY9RWC009V5C5quN'); 

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };

  useEffect(() => {
    const initializeStripe = async () => {
      const stripe = await stripePromise;
      const appearance = {
        theme: 'stripe',
        variables: {
          borderRadius: '36px',
        },
      };

      const expressCheckoutOptions = {
        paymentMethods:{applePay:"always",googlePay:"always",amazonPay:"auto"},
        buttonHeight: 50,
        buttonTheme: {
          applePay: 'white-outline',
        //   googlePay:'always'
        }
      }

      const elements = stripe.elements({
        locale: 'de',
        mode: 'payment',
        amount: totalAmount * 100,  
        currency: 'usd',
        appearance,
      });

      const expressCheckoutElement = elements.create(
        'expressCheckout',
        expressCheckoutOptions
      );
      expressCheckoutElement.mount('#express-checkout-element');
    };

    initializeStripe();
  }, [totalAmount]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Checkout</h1>
      <p className="text-center text-xl mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>
      <div id="express-checkout-element" className=''></div>
      <div className="mt-6 text-center">
    
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mx-2"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
