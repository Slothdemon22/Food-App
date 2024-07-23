import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Additem() {
    axios.defaults.withCredentials = true;
    const [foodData, setFoodData] = useState({
        name: '',
        price: '',
        description: '',
        foodimage: null,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFoodData({ ...foodData, [id]: value });
    };

    const handleFileChange = (e) => {
        setFoodData({ ...foodData, foodimage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('foodName', foodData.name);
        formData.append('foodPrice', foodData.price);
        formData.append('foodDescription', foodData.description);
        formData.append('foodImage', foodData.foodimage);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/food/insertfood', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Food item added successfully!");
            console.log(response.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <>
            <div className="h-screen  w-full mt-10 mr-8 md:mr-0 bg-gradient-to-r from-blue-50 to-green-50 flex items-center justify-center">
                <form className="w-[80%] flex items-center flex-col justify-center md:w-[45%]" onSubmit={handleSubmit}>
                    <div className="flex  w-full items-center justify-center mb-5">
                        <label
                            htmlFor="foodimage"
                            className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex mb-4 h-[120%] flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold text-sm">Click to upload
                                        <p className='block text-sm text-center'>-OR-</p>
                                    </span> drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            <input id="foodimage" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                    <div className="mb-5 w-full ">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                            Food Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={foodData.name}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                            Food Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            value={foodData.price}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                            Food Description
                        </label>
                        <textarea
                            id="description"
                            rows="8" // Set the number of rows here
                            value={foodData.description}
                            onChange={handleChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Food Item
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}

export default Additem;
