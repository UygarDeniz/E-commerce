import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../slices/userSlice";
import { logout } from "../slices/userSlice";

function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  function handleLogout() {
    dispatch(logout());
    dispatch(reset());
  }
  return (
    <header className="bg-gray-800  flex justify-between items-center p-5">
      <div>
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">MyShop</h1>
        </Link>
      </div>
      <nav className="flex items-center px-4">
        ,
        <Link
          to="/"
          className="px-4 py-2 rounded-xl text-xl text-white hover:bg-gray-600"
        >
          Home
        </Link>
        <Link
          to="/categories"
          className="px-4 py-2 rounded-xl text-xl  text-white hover:bg-gray-600"
        >
          Categories
        </Link>
        <Link
          to="/cart"
          className="flex text- items-center gap-2 px-4 py-2 rounded-xl text-xl  text-white hover:bg-gray-600"
        >
          <FaShoppingCart /> <span className="text-red-500">({cartItems.length})</span>
        </Link>
        {userInfo ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xl  text-white hover:bg-gray-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xl  text-white hover:bg-gray-600"
            >
              <FaSignInAlt /> Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-xl text-xl  text-white hover:bg-gray-600"
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
