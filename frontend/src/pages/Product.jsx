import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

function Product() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProduct() {
      const res = await fetch(`/api/products/${id}`);

      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        console.log("error");
      }
    }
    getProduct();
  }, [id]);

  function addToCartHandler() {
    
    dispatch(addToCart({...product , quantity}));
  }

  return (
    <div className="grid  md:grid-cols-3 mt-20">
      <div className="md:col-span-2 bg-zinc-100 p-10 mx-0 md:mx-10 flex justify-center align-center ">
        <img src={product.image} alt={product.name} className="max-h-[600px]" />
      </div>
      <div className="flex flex-col justify-between m-20 md:m-0">
        <div>
          <h3 className="text-4xl font-bold">{product.name}</h3>
          <p className="text-3xl font-bold">Price: {product.price}$</p>
          <p className="text-2xl mt-8">Brand: {product.brand}</p>
          <p className="text-2xl">Category: {product.category}</p>
        </div>
        <p className="text-2xl">Description: {product.description}</p>
        <div>
          <p className="text-2xl font-bold  {product.countInStock > 0 ? text-green-700 : text-red-600} my-10">
            {product.countInStock > 0 ? "In Stock" : "No Stock"}
          </p>
          <div className="flex">
            <FaPlus
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-2xl cursor-pointer"
            />
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-14 text-2xl mx-2 text-center"
            />
            <FaMinus
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className="text-2xl cursor-pointer"
            />
          </div>
          <button className="bg-red-600 text-white text-xl px-4 py-2 rounded-md mt-8" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
