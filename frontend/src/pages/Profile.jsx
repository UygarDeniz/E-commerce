import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch(`/api/auth/profile/${userInfo._id}`);
      const data = await res.json();
      setUsername(data.username);
      setEmail(data.email);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/order/myorders`);
      const data = await res.json();

      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/auth/profile/${userInfo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });
    const data = await res.json();
    setUsername(data.username);
    setEmail(data.email);
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Profile</h1>
        <div className="space-y-2">
          <label className="block">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="block w-full p-2 mt-1 border-gray-300 rounded shadow-sm  sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          >
            Update Profile
          </button>
          <Link
            to="/profile/change-password"
            className="text-indigo-600 hover:underline"
          >
            Change Password
          </Link>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">My Orders</h2>
        {orders.map((order) => (
          <div key={order._id} className="mt-4 p-4 border rounded shadow">
            <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
            <p className="text-gray-700">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <h4 className="mt-2 text-lg font-bold">Products:</h4>
            <ul className="list-disc ml-5">
              {order.products.map((product) => (
                <li key={product._id} className="text-gray-700">
                  <p>Name: {product.name}</p>
                  <p>Price: {product.price}</p>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-gray-700">
              Total Amount: {order.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
