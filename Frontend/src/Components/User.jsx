import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function User() {
    const [foodItems, setFoodItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    const fetchFoodItems = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/food/getfood", { withCredentials: true });
            if (res.data && res.data.data) {
                setFoodItems(res.data.data);
                toast.success("Food items fetched successfully!");
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
            toast.error("Failed to fetch food items. Please try again.");
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const handleOrder = async (itemId, quantity) => {
        try {
            await axios.post("http://localhost:3000/api/v1/orders/place_order", {
                productId: itemId,
                quantity: quantity,
            }, { withCredentials: true });
            toast.success("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const handleQuantityChange = (id, change) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: Math.max(1, (prevQuantities[id] || 1) + change),
        }));
    };

    return (
        <>
            <div className="flex  mt-44  flex-wrap  items-center justify-center gap-10 p-8  ">
                {foodItems.length > 0 ? (
                    foodItems.map(item => (
                        <div key={item._id} className="w-72bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                            <img src={item.foodImage} alt={item.foodName} className="w-full h-56 object-cover rounded-t-xl" />
                            <div className="p-6 mt-4">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{item.foodName}</h2>
                                <p className="text-gray-700 mb-4">{item.foodDescription}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-semibold text-gray-900">${item.foodPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center">
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange(item._id, -1)} 
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <input 
                                            type="text" 
                                            value={quantities[item._id] || 1} 
                                            readOnly 
                                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => handleQuantityChange(item._id, 1)} 
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button 
                                        onClick={() => handleOrder(item._id, quantities[item._id] || 1)} 
                                        className="px-2 m-4 text-center py-3 text-md tracking-tight w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">No food items found.</p>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default User;
