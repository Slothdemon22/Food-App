import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaBookmark, FaEllipsisV, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const [mode, setMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  const close = () => {
    setMode(!mode);
  
  };

  const handleLinkClick = () => {
    setMode(false);
    document.querySelector("#bar").classList.add("hidden");
  };

  const handleLogout = () => {
    window.close();
  };

  return (
    <>
      <div
        className="flex justify-between items-center bg-[#151269] w-full h-24 z-30 fixed top-0 left-0 shadow-2xl"
        onClick={close}
        id="Primary-Navbar"
      >
        <button className="h-18 w-30 my-2 bg-blue-700 p-4 w-14 rounded-lg text-sm text-white hover:scale-105 transform transition duration-300 ease-in-out active:text-black shadow-2xl save-button flex justify-between items-center mx-3">
          <FaBars className="text-white h-5 w-5 mx-auto" />
        </button>
        <div className="mx-auto bg-blue-700 h-12 w-50 rounded-2xl text-center p-[12px] shadow-2xl text-white hover:scale-105 transform transition duration-2 ease-in-out md:w-30">
          Logo
        </div>
      </div>

      <div
        className={`sidebar fixed top-0 bottom-0 z-30 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 shadow-2xl rounded-tr-2xl rounded-br-2xl transition-transform duration-300 ${
          mode ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
        id="bar"
      >
        <div className="text-gray-100 text-xl ">
          <div className="p-2 mt-1 mx-4 flex items-center justify-between lg:justify-between md:mx-4">
            <h1 className="font-bold text-gray-200 ml-3 text-[15px]">Tailwind</h1>
            <FaTimes className="cursor-pointer text-2xl" onClick={close} />
          </div>
          <hr className="my-2 text-gray-600" />
        </div>

        <Link to="/additems" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaHome className="mr-2" />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">Add Items</span>
          </button>
        </Link>

        <Link to="/fooditems" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaBookmark className="mr-2" />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">Manage Food Items</span>
          </button>
        </Link>

        <Link to="/getorders" className="my-4 w-full">
          <button
            onClick={handleLinkClick}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white w-full"
          >
            <FaBookmark className="mr-2" />
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">Manage Orders</span>
          </button>
        </Link>

        <hr className="my-2 text-gray-600 shadow-2xl" />
        <div
          className="p-2.5 mt-3 flex transition duration-300 ease-in-out items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white"
          onClick={toggleDropdown}
        >
          <FaEllipsisV className="mr-2" />
          More
          <div className="flex justify-between w-full items-center">
            <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200"></span>
            <span
              className={`text-sm transform transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              id="arrow"
            >
              <i className="fas fa-chevron-down"></i>
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
        <div
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          <span className="mx-3 font-poppins text-[14px] ml-4 text-gray-200">Close</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;
