import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";

function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful</h1>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-800 px-4 py-2 rounded-xl text-3xl text-white hover:bg-gray-500 mt-4"
      >Keep Shoping</button>
    </div>
  );
}

export default SuccessPayment;
