import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const useUserOrders = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [profileRes, totalPagesRes, ordersRes] = await Promise.all([
          fetch(`/api/auth/profile/${userInfo._id}`, { signal }),
          fetch('/api/order/myorders/total', { signal }),
          fetch(`/api/order/myorders?page=${page}`, { signal }),
        ]);

        if (!profileRes.ok || !totalPagesRes.ok || !ordersRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const profileData = await profileRes.json();
        const totalPagesData = await totalPagesRes.json();
        const ordersData = await ordersRes.json();

        setUsername(profileData.username);
        setEmail(profileData.email);
        setTotalPages(totalPagesData.totalPages);
        setOrders(ordersData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('Error fetching data');
          console.error('Error fetching data:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [userInfo._id, page]);

  return {
    username,
    setUsername,
    email,
    setEmail,
    orders,
    totalPages,
    isLoading,
    error,
    userId: userInfo._id,
  };
};

export default useUserOrders;
