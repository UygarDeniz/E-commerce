import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [dispatch, navigate, userInfo]);

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.message) throw new Error(data.message);
        else throw new Error('Failed to register');
      }
      return data;
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      navigate('/');
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }
  return (
    <div className='min-h-screen items-center flex justify-center text-center px-8 bg-gray-200'>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md w-full'>
        <h1 className='mb-10 font-bold text-4xl'>Register</h1>
        {error && <h2 className='text-red-400 '>{error}</h2>}

        <input
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='border-2 border-black px-4 py-2 rounded-t-md  w-full  '
        />
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
          className='border-2 border-black px-4 py-2 w-full  '
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          className='border-2 border-black  rounded-b-md px-4 py-2 w-full block'
        />

        <button className='bg-black text-white px-6 py-2 rounded-md mt-4'>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
