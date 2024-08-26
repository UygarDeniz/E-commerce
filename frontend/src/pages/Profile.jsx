import { Link } from 'react-router-dom';
import PaginationButtons from '../components/PaginationButtons';
import useProfileInformation from '../../hooks/useProfileInformation';

export default function Profile() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    orders,
    totalPages,
    isLoading,
    userId,
  } = useProfileInformation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });

      if (!res.ok) {  
        throw new Error(
          res?.message || res.statusText || 'Failed to update profile'
        );
      }
      const data = await res.json();
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-2xl font-bold'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md'
      >
        <h1 className='text-2xl font-bold text-center'>Profile</h1>
        <div className='space-y-2'>
          <label className='block'>
            <span className='text-gray-700'>Username:</span>
            <input
              type='text'
              value={username}
              autoComplete='off'
              className='blockzw-full p-2 mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm'
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className='block'>
            <span className='text-gray-700'>Email:</span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              className='block w-full p-2 mt-1 border-gray-300 rounded shadow-sm sm:text-sm'
            />
          </label>
          <button
            type='submit'
            className='w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500'
          >
            Update Profile
          </button>
          <Link
            to='/profile/change-password'
            className='text-indigo-600 hover:underline'
          >
            Change Password
          </Link>
        </div>
      </form>

      <h2 className='text-2xl font-bold text-center mt-12'>My Orders</h2>
      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {orders.map((order) => (
          <div
            key={order._id}
            className='mt-4 p-4 border rounded shadow w-full'
          >
            <h3 className='text-xl font-bold'>Order ID: {order._id}</h3>
            <p className='text-gray-700'>
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <h4 className='mt-2 text-lg font-bold'>Products:</h4>
            <ul className='list-disc ml-5'>
              {order.products.map((product) => (
                <li key={product._id} className='text-gray-700'>
                  <p>Name: {product.name}</p>
                  <p>Price: {product.price}</p>
                </li>
              ))}
            </ul>
            <p className='mt-2 text-gray-700'>
              Total Amount: {order.totalPrice}
            </p>
          </div>
        ))}
      </div>

      <PaginationButtons totalPages={totalPages} />
    </div>
  );
}
