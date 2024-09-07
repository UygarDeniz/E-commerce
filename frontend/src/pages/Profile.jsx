import { useState, useEffect } from 'react';
import PaginationButtons from '../components/PaginationButtons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchMyOrders, fetchTotalMyOrders } from '../data-access/orders';
import { fetchProfileById, updateProfileById } from '../data-access/users';
import Loading from '../components/Loading';

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState('');
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
  });
  const page = Number(searchParams.get('page')) || 1;

  const {
    data: profileData,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['profile', userInfo._id],
    queryFn: () => fetchProfileById(userInfo._id),
  });

  const {
    data: orders,
    isPending: isOrdersPending,
    isError: isOrdersError,
  } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => fetchMyOrders(page),
  });

  const {
    data: totalPages,
    isPending: isTotalPagesPending,
    isError: isTotalPagesError,
  } = useQuery({
    queryKey: ['totalOrders'],
    queryFn: fetchTotalMyOrders,
  });

  const {
    mutate: updateProfileMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ username, email }) =>
      updateProfileById(userInfo._id, username, email),
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
      setSuccessMessage('Profile updated successfully');
      console.log('success');
    },
    onError: (error) => {
      console.log(
        'An error occurred while updating the profile:',
        error.message
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      username: formState.username,
      email: formState.email,
    });
  };
  
  useEffect(() => {
    if (profileData) {
      setFormState({
        username: profileData.username || '',
        email: profileData.email || '',
      });
    }
  }, [profileData]);

  if (isProfilePending || isTotalPagesPending) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-2xl font-bold'>Loading...</p>
      </div>
    );
  }
  if (isProfileError || isTotalPagesError || isOrdersError) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <p className='text-2xl font-bold text-red-500'>Error fetching data</p>
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
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
        {error && <p className='text-red-500'>{error.message}</p>}

        <div className='space-y-2'>
          <div>
            <label className='text-gray-700' htmlFor='username'>
              Username:
            </label>
            <input
              type='text'
              id='username'
              value={formState.username}
              autoComplete='off'
              className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm sm:text-sm'
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className='text-gray-700' htmlFor='email'>
              Email:
            </label>

            <input
              id='email'
              type='email'
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              autoComplete='off'
              className='block w-full p-2 mt-1 border-gray-300 rounded shadow-sm sm:text-sm'
            />
          </div>

          <button
            type='submit'
            className='w-full px-3 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500'
          >
            {isPending ? 'Loading...' : 'Update Profile'}
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
      {isOrdersPending ? (
        <Loading />
      ) : (
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
      )}

      <PaginationButtons totalPages={totalPages?.totalPages} />
    </div>
  );
}
