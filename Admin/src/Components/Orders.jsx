import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orders() {
    axios.defaults.withCredentials = true;
    const [orders, setOrders] = useState([]);
    const [updatingStatus, setUpdatingStatus] = useState(null);
const delOrder = async (id) => {
    try {
        const res=await axios.post(`http://localhost:3000/api/v1/orders/remove_order`, { id } ,{ withCredentials: true });
        toast.success("Order deleted successfully!");
        fetchOrders();
    } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order. Please try again.");
    }
}
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/orders/get_orders", { withCredentials: true });
            console.log(res.data);
            if (res.data && res.data.data) {
                setOrders(res.data.data); // Set orders to res.data.data
                toast.success("Orders fetched successfully!"); // Show success toast
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders. Please try again."); // Show error toast
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingStatus(orderId);
        try {
            await axios.post(`http://localhost:3000/api/v1/orders/update_status/`, {id: orderId, status: newStatus }, { withCredentials: true });
            toast.success("Order status updated successfully!");
            fetchOrders(); // Refresh orders list
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status. Please try again.");
        } finally {
            setUpdatingStatus(null);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <div className="flex flex-col items-center ml-16 justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-3xl  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-2xl font-semibold text-gray-800">Orders List</h1>
                    </div>
                    <div className="p-6">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order._id} className="order border border-gray-300 rounded-lg mb-4 p-6 shadow-sm bg-white transition-transform transform hover:scale-105 hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-medium text-gray-700">Order ID:</p>
                                        <p className="text-lg text-gray-600">{order._id}</p>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-medium text-gray-700">Food Item:</p>
                                        <p className="text-lg text-gray-600">{order.foodItem ? order.foodItem.foodName : "Unknown"}</p>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-medium text-gray-700">Quantity:</p>
                                        <p className="text-lg text-gray-600">{order.quantity}</p>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-medium text-gray-700">Placed By:</p>
                                        <p className="text-lg text-gray-600">{order.placedBy ? order.placedBy.username : "Unknown"}</p>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-lg font-medium text-gray-700">Status:</p>
                                        <p className={`text-lg ${order.status === 'delivered' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.status}</p>
                                    </div>
                                    <div className="flex items-center justify-evenly items-center">
                                        <button  onClick={() => delOrder(order._id)} className="bg-yellow-500 m-2 px-6 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Remove</button>
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'pending')}
                                            disabled={order.status === 'pending' || updatingStatus}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                                        >
                                            Pending
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'delivered')}
                                            disabled={order.status === 'delivered' || updatingStatus}
                                            className="px-4 m-2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
                                        >
                                            Delivered
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'cancelled')}
                                            disabled={order.status === 'cancelled' || updatingStatus}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
                                        >
                                            Cancelled
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-lg text-gray-600 text-center">No orders found.</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Orders;
