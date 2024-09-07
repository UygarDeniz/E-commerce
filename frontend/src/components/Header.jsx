import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
function Header() {
  const [search, setSearch] = useState('');
  const { userInfo } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: Logout } = useMutation({
    mutationFn: () =>
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    onSuccess: () => {
      dispatch(reset());
      localStorage.removeItem('userInfo');
      navigate('/');
    },
  });

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    } else {
      navigate('/');
    }
  }
  console.log(userInfo);
  return (
    <header className='bg-gray-800  flex justify-between items-center p-5'>
      <div>
        <Link to='/'>
          <h1 className='text-white text-xl md:text-2xl font-bold mr-2'>
            MyShop
          </h1>
        </Link>
      </div>
      <form onSubmit={handleSearch} className='w-1/4'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search...'
          className='px-2 py-1 rounded-md text-sm text-black w-full'
        />
      </form>
      <nav className='flex items-center pr-4'>
        ,
        <Link
          to='/'
          className='px-4 py-2 rounded-xl text-sm md:text-xl text-white hover:bg-gray-600 hidden md:block'
        >
          Home
        </Link>
        <Link
          to='/cart'
          className='flex text- items-center gap-2 px-4 py-2 rounded-xl text-sm md:text-xl  text-white hover:bg-gray-600'
        >
          <FaShoppingCart />{' '}
          <span className='text-red-500'>({cartItems.length})</span>
        </Link>
        {userInfo && userInfo.isAdmin && (
          <Link
            to='/admin'
            className='px-4 py-2 rounded-xl text-sm md:text-xl  text-white hover:bg-gray-600'
          >
            Admin
          </Link>
        )}
        {userInfo ? (
          <>
            <Link
              to='/profile'
              className='px-4 py-2 rounded-xl text-sm md:text-xl text-white hover:bg-gray-600'
            >
              Profile
            </Link>
            <button
              onClick={Logout}
              className='px-4 py-2 rounded-xl text-sm md:text-xl  text-white hover:bg-gray-600'
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to='/login'
              className='px-4 py-2 rounded-xl text-sm md:text-xl  text-white hover:bg-gray-600'
            >
              <FaSignInAlt /> Login
            </Link>

            <Link
              to='/register'
              className='px-4 py-2 rounded-xl text-sm md:text-xl  text-white hover:bg-gray-600'
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
