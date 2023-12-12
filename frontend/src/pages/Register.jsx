import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../slices/userSlice";
import { reset } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, error, success, message, userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    
    dispatch(reset());
  }, [loading, error, success, message]);

  
  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(formData));
    console.log(loading, error, success, message);
  }
  return (
    <div className="min-h-screen items-center flex justify-center text-center px-8 bg-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
        <h1 className="mb-10 font-bold text-4xl">Register</h1>
        {error && <h2 className="text-red-400 ">{message}</h2>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-2 border-black px-4 py-2 rounded-t-md  w-full  "
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border-2 border-black px-4 py-2 w-full  "
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-2 border-black  rounded-b-md px-4 py-2 w-full block"
        />

        <button className="bg-black text-white px-6 py-2 rounded-md mt-4">
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
