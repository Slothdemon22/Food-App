// Signin.jsx
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
function Signin({ popup, setPopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      }, { withCredentials: true });
      
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div
      id="info-popup"
      className="fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto bg-white rounded-lg shadow dark:bg-gray-800">
        
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close"
          onClick={() => setPopup(false)} // Close popup when button is clicked
          
        >
        
          <RxCross1 className="text-2xl" />
        </button>
        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          Sign In
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 w-full text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
          </p>
          <Link onClick={() => setPopup(false)} to="/register" className="text-primary-700 hover:underline dark:text-primary-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
