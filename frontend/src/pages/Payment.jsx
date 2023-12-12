import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51OMHzyG6Gkikp1V1sERDAik1LRwFUWr0aCriwzzWVxLcHMXh17urPVtLbI2hcQXLkdJKEhG5dnWfQJoj0M7SKnTS00G9Qb7EnS"
);
function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate("/cart");
    }
    if (Object.keys(cart.shippingAddress).length === 0) {
      navigate("/shipping");
    }

    async function getClientSecret() {
      const response = await fetch("/api/order/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.cartItems }),
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
      console.log(data.clientSecret);
    }
    getClientSecret();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
