import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FoodItems() {
    const [foodItems, setFoodItems] = useState([]);
    const handleDelete = async (id) => {
        try {
            const res=await axios.post(`http://localhost:3000/api/v1/food/remove_food`, { id } ,{ withCredentials: true });
            toast.success("Food item deleted successfully!");
            fetchFoodItems();
        } catch (error) {
            console.error("Error deleting food item:", error);
            toast.error("Failed to delete food item. Please try again.");
        }
    }
    const fetchFoodItems = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/food/getfood", { withCredentials: true });
            console.log(res.data);
            if (res.data && res.data.data) {
                setFoodItems(res.data.data); // Set food items to res.data.data
                toast.success("Food items fetched successfully!"); // Show success toast
            }
        } catch (error) {
            console.error("Error fetching food items:", error);
            toast.error("Failed to fetch food items. Please try again."); // Show error toast
        }
    };

    useEffect(() => {
        fetchFoodItems();
    }, []);

    return (
        <>
            <div className="flex flex-wrap mt-20 items-center justify-center gap-10 p-8 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <div key={item._id} className="w-72 bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
                            <img src={item.foodImage} alt={item.foodName} className="w-full h-56 object-cover rounded-t-xl" />
                            <div className="p-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{item.foodName}</h2>
                                <p className="text-gray-700 mb-4">{item.foodDescription}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-semibold text-gray-900">${item.foodPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <button className="px-3 py-2 text-md tracking-tight bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                                        Add to Cart
                                    </button>
                                    <button onClick={() => handleDelete(item._id) } className="px-7 py-2 text-md tracking-tight bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors">
                                        Delete
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

export default FoodItems;
