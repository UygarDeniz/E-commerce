import  { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slices/userSlice';
import { reset } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, message, userInfo } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }

    if (error) {
      setErrorMessage(message);
      console.log(errorMessage);
    }

    dispatch(reset());
  }, [
    loading,
    error,
    success,
    message,
    userInfo,
    dispatch,
    navigate,
    errorMessage,
  ]);
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(formData));
  }

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className='min-h-screen items-center flex justify-center text-center px-8 bg-gray-200'>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md w-full'>
        <h1 className='mb-10 font-bold text-4xl'>Login</h1>
        {errorMessage && <h2 className='text-red-400 '>{errorMessage}</h2>}

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
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          className='border-2 border-black  rounded-b-md px-4 py-2 w-full block'
        />

        <button className='bg-black text-white px-6 py-2 rounded-md mt-4'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
