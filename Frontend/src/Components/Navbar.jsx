import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { FaBars, FaHome, FaSignInAlt, FaUserPlus, FaUser, FaShoppingCart, FaChevronDown, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import Signin from "./Signin";

function Navbar({ admin }) {
  const [mode, setMode] = useState(false);
  const [popup, setPopup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem('email', "");
    localStorage.setItem('password', "");
    localStorage.setItem('auth', ""); // Store user status

    try {
      const res = await axios.post('http://localhost:3000/api/v1/users/logout', { withCredentials: true });
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      navigate('/');
    }

    navigate('/');
  };

  const handlePopup = () => {
    setPopup(!popup);
  };

  function toggleDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  const close = () => {
    setMode(!mode);
    if (mode) {
      document.querySelector("#bar").classList.remove("hidden");
    } else {
      document.querySelector("#bar").classList.toggle("hidden");
      document.querySelector("#Primary-Navbar").classList.remove("hidden");
    }
  };

  const handleLinkClick = () => {
    setMode(false);
    document.querySelector("#bar").classList.add("hidden");
  };
  const handleClosePopUp = () => {
    setPopup(false);
  };
  const handleAdminClick = () => {
    window.open('http://localhost:5174/fooditems', '_blank');
    handleLinkClick();
  };

  return (
    <>
     
      <div
        className="flex justify-between items-center bg-[#151269] w-full h-24 z-30 fixed top-0 left-0 shadow-2xl"
        onClick={close}
        id="Primary-Navbar"
      >
        <button className="h-18 w-30 my-2 bg-blue-700 p-4 w-14 rounded-md text-sm text-white hover:scale-105 transform transition duration-300 ease-in-out active:text-black shadow-2xl save-button flex justify-between items-center mx-3">
          <FaBars className="text-white h-5 w-5 mx-auto" />
        </button>
      </div>

      <div
        className={`sidebar fixed top-0 bottom-0 z-30 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow-2xl rounded-tr-2xl rounded-br-2xl transition-transform duration-300 ${
          mode ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        id="bar"
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2 mt-1 mx-2 flex items-center justify-between lg:justify-between md:mx-4">
            <h1 className="font-bold text-gray-200 ml-3 text-[15px]">Tailwind</h1>
            <RxCross1 className="ml-[20px] cursor-pointer text-2xl" onClick={close} />
          </div>
          <hr className="my-2 text-gray-600" />
        </div>

        {admin && (
          <button
            onClick={handleAdminClick}
            className="my-4 w-full p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          >
            <FaHome />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
              Admin Panel
            </span>
          </button>
        )}
        <Link to="/" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaHome />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
              Home
            </span>
          </button>
        </Link>
        <button
          onClick={handlePopup}
          className="my-4 w-full p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
        >
          <FaSignInAlt />
          <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
            Sign In
          </span>
        </button>
        <Link to="/register" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaUserPlus />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
              Register
            </span>
          </button>
        </Link>
        <Link to="/user" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaUser />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
           Menu
            </span>
          </button>
        </Link>
        <Link to="/cart" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaShoppingCart />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
              Cart
            </span>
          </button>
        </Link>

        <hr className="my-2 text-gray-600 shadow-2xl" />
        <div
          className="p-2.5 mt-3 flex transition duration-300 ease-in-out items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <FaCommentDots className="m-2" />
          More
          <div className="flex justify-between w-full items-center">
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200"></span>
            <span
              className={`text-sm transform transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              id="arrow"
            >
              <FaChevronDown />
            </span>
          </div>
        </div>

        <div
          className={`text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
            dropdownOpen ? "max-h-40" : "max-h-0"
          }`}
          id="submenu"
        >
          {/* Add submenu links here */}
        </div>
        <button
          onClick={handleLogout}
          className="p-2.5 w-full mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        >
          <FaSignOutAlt />
          <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">
            Logout
          </span>
        </button>
      </div>

      {popup && <Signin popup={popup} setPopup={setPopup}/>}
    </>
  );
}

export default Navbar;
