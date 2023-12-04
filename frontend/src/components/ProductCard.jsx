import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
  _id,
  name,
  image,
  brand,
  category,
  description,
  price,
}) {
  return (
    <Link
      to={`/product/${_id}`}
      className="bg-gray-100 flex flex-col justify-between border-2 rounded-md p-4 h-full"
    >
      <div className="h-full  flex flex-col justify-center">
        <img src={image} className=""></img>
      </div>
      <div>
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-lg">{brand}</p>
        <p className="text-lg">{description}</p>
        <p className="text-lg">{category}</p>
        <p className="text-lg font-bold">{price}$</p>
      </div>
    </Link>
  );
}

export default ProductCard;
