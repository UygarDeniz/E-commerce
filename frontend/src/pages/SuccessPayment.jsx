import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
function SuccessPayment() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  setTimeout(() => {
    dispatch(clearCart());
    navigate("/");
  }, 3000);
  return (
    <div>
      <h1 className="text-4xl font-bold text-green-600">Payment Successful</h1>{" "}
    </div>
  );
}

export default SuccessPayment;
