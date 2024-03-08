import React, { useEffect } from "react";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../slices/cartSlice";

function CartCard({ product }) {
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch(addToCart({ ...product, quantity: quantity + 1 }));
  }
  function decreaseQuantityHandler() {
    dispatch(decreaseQuantity(product._id));
  }
  function removeFromCartHandler() {
    dispatch(removeFromCart(product._id));
  }
  const { image, name, brand, price, quantity } = product;

  return (
    <div className="grid grid-cols-2 mt-10 border-2 border-gray-600 p-6 items-center">
      <div className=" flex justify-end mr-10 ">
        <img src={image} alt={name} className="max-h-[200px] max-w-[200px] " />
      </div>
      <div className="flex flex-col justify-between">
        <h3 className="text-4xl font-bold">{name}</h3>
        <p className="text-xl">{brand}</p>
        <p className="text-2xl font-bold">{price}$</p>
        <div className="flex gap-10 items-center">
          {quantity > 1 ? (
            <FaMinus
              onClick={decreaseQuantityHandler}
              className="text-4xl cursor-pointer"
            />
          ) : (
            <FaTrashAlt
              onClick={removeFromCartHandler}
              className="text-4xl cursor-pointer"
            />
          )}
          <p className="text-xl font-bold select-none	">{quantity}</p>
          <FaPlus
            onClick={addToCartHandler}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default CartCard;
