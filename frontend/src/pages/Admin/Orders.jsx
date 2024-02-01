import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/order");
      const data = await res.json();
      console.log(data);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Is Paid</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="bg-gray-100">
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user._id}</td>{" "}
              {/* Access user's properties here */}
              <td className="border px-4 py-2">{order.totalPrice}</td>
              <td className="border px-4 py-2">
                {order.isPaid ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
