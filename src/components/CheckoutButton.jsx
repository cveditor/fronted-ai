import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutButton = ({ plan }) => {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payments/create-checkout-session`,
        { plan },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Errore durante il checkout:', error);
      alert('Si è verificato un errore durante il pagamento.');
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
    >
      Abbonati al piano {plan}
    </button>
  );
};

export default CheckoutButton;
