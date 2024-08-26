import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaginationButtons from '../../components/PaginationButtons';
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    console.log(page);
    const fetchOrders = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/order?page=${page}`);
      const data = await res.json();
      setOrders(data);
      setIsLoading(false);
    };

    const fetchTotalPages = async () => {
      const res = await fetch('/api/order/total');
      const data = await res.json();
      setTotalPages(data.totalPages);
    };

    fetchOrders();
    fetchTotalPages();
  }, [page]);
  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-2xl font-bold'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 mt-6'>
      <h1 className='text-2xl font-bold mb-4'>Orders</h1>
      {orders.length > 0 ? (
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Order ID</th>
              <th className='px-4 py-2'>User ID</th>
              <th className='px-4 py-2'>Total Price</th>
              <th className='px-4 py-2'>Is Paid</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='bg-gray-100'>
                <td className='border px-4 py-2'>{order._id}</td>
                <td className='border px-4 py-2'>{order.user._id}</td>{' '}
                {/* Access user's properties here */}
                <td className='border px-4 py-2'>{order.totalPrice}</td>
                <td className='border px-4 py-2'>
                  {order.isPaid ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-xl font-bold'>No orders found</p>
      )}
      <PaginationButtons totalPages={totalPages} />
    </div>
  );
}
