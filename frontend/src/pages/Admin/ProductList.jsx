import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
        console.log(id);
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
      } else {
        console.log("Product deletion failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex content-end">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <Link to="/admin/products/create" className="ml-auto ">
          <FaPlus className="text-4xl" />
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">CountInStock</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-gray-100">
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.countInStock}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit className="text-2xl" />
                </Link>
              </td>
              <td className="border px-4 py-2">
                <FaTrash
                  className="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                  onClick={() => handleDelete(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;
