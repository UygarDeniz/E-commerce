import { useSearchParams } from 'react-router-dom';
import PaginationButtons from '../../components/PaginationButtons';
import { fetchOrders, fetchTotalOrders } from '../../data-access/orders';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
export default function Orders() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, _] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const {
    data: orders,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => fetchOrders(page),
  });
  const { data: totalPages } = useQuery({
    queryKey: ['orders-total-pages'],
    queryFn: fetchTotalOrders,
  });

  return (
    <div className='container mx-auto px-4 mt-6'>
      <h1 className='text-2xl font-bold mb-4'>Orders</h1>
      {isPending ? (
        <div className='mt-40'>
          <Loading />
        </div>
      ) : orders.length > 0 ? (
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
                <td className='border px-4 py-2'>{order.user._id}</td>
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
      {isError && (
        <p className='text-red-500'>
          An error occurred while fetching the orders
        </p>
      )}
      <PaginationButtons totalPages={totalPages?.totalPages} />
    </div>
  );
}
