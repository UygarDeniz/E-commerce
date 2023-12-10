import React from "react";
import CartCard from "../components/CartCard";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 mx-10">
            {cartItems.map((item) => (
              <CartCard key={item._id} product={item} />
            ))}
          </div>
          <div className="text-center  mx-auto md:mx-0 md:mr-10 mt-4 p-4 max-h-[350px] border-4 border-gray-700">
            <h2 className="text-4xl font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in
              the cart
            </h2>
            <h2 className="text-4xl my-10 font-bold">
              Total Price:
              {cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}
              $
            </h2>
            <button className="bg-gray-800 px-4 p-2 rounded-xl text-3xl  text-white hover:bg-gray-500">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-bold text-center mt-32">
            Your Cart is Empty
          </h1>
          <div className="flex justify-center mt-4 ">
            <button className="bg-gray-800 px-4 p-2 rounded-xl text-3xl  text-white hover:bg-gray-500">
              Go Shopping
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
