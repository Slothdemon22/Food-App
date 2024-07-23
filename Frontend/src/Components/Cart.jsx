import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/orders/cart", { withCredentials: true });
            setCart(res.data.data);
            toast.success("Cart fetched successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error fetching cart");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="container mx-auto p-4 mt-36">
            <h1 className="text-3xl font-bold mb-14 text-center mb-8">Your Orders</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cart.map((order) => (
                        <div key={order._id} className="p-6 bg-white shadow-md rounded-lg">
                            {order.foodItem ? (
                                <>
                                    <img src={order.foodItem.foodImage || "no image"} alt={order.foodItem.foodName || "No Name"} className="w-full h-40 object-cover rounded-t-lg" />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{order.foodItem.foodName}</h2>
                                        <p className="text-gray-700 mb-1"><strong>Quantity:</strong> {order.quantity}</p>
                                        <p className="text-gray-700 mb-1"><strong>Price:</strong> ${order.foodItem.foodPrice}</p>
                                        <p className="text-gray-700 mb-1"><strong>Status:</strong> {order.status}</p>
                                        <p className="text-gray-700 mb-1"><strong>Description:</strong> {order.foodItem.foodDescription}</p>
                                        <p className="text-gray-500 text-sm mt-2"><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 h-full flex flex-col justify-center text-center items-center">
                                    <h2 className="text-xl font-semibold mb-2">Item Removed</h2>
                                    <p className="text-gray-700 mb-1">This item has been removed by the admin.</p>
                                    <p className="text-gray-500 text-sm mt-2"><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No orders in your cart.</p>
            )}
        </div>
    );
}

export default Cart;
