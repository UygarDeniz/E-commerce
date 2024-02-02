import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function SearchResult() {
  const [products, setProducts] = useState([]);
  const { keyword } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/search/${keyword}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4 mt-10">
      <h1 className="mx-20 text-2xl font-bold mb-4">
        Search results for "{keyword}":
      </h1>
      {products.length > 0 ? (
        <section className="mt-10 mx-20">
          <div className="mt-10  grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  image={product.image}
                  brand={product.brand}
                  description={product.description}
                  category={product.category}
                  price={product.price}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
}

export default SearchResult;
