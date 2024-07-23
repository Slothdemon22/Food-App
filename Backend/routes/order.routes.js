import express from 'express';
import { Order } from '../models/order.model.js';
import { Food } from '../models/food.model.js';
import User from '../models/user.model.js';
import auth from '../middlewares/authUser.js';
import authAdmin from '../middlewares/authAdmin.js';
const router = express.Router();

router.post('/place_order', auth, async (req, res) => {
    try {
        console.log(req.body)
        const { productId, quantity } = req.body;

        // Find the food item by name
        const item = await Food.findOne({ _id:productId });

        if (!item) {
            return res.status(404).json({
                status: 404,
                message: "Food item not found",
            });
        }

        // Create a new order
        const newOrder = new Order({
            foodItem: item._id, // Use item._id instead of item.id
            quantity,
            placedBy: req.user
        });
       
        // Save the order to the database
        await newOrder.save();

        // Find the authenticated user and push the new order into the orders array
        const user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        user.orders.push(newOrder._id);
        await user.save();

        // Populate the foodItem field with the actual food item document
        const populatedOrder = await Order.findById(newOrder._id).populate('foodItem').populate("placedBy");

        res.status(200).json({
            status: 200,
            message: "Order placed successfully",
            data: populatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message
        });
    }
});
router.post("/remove_order",authAdmin, async(req, res) => {
    try {
        const { id } = req.body;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order not found",
            });
        }
        await Order.findByIdAndDelete(id);
        res.status(200).json({
            status: 200,
            message: "Order deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message
        });
    }    
});
router.get('/get_orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('foodItem').populate("placedBy");
        console.log("hello");
       // console.log(orders);
        console.log(orders.length);
        console.log(orders)
        res.status(200).json({
            status: 200,
            message: "Orders fetched successfully",
            data: orders
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message
        });
    }
});
router.get('/cart', auth, async (req, res) => {
    try {
        const Cart = await Order.find({ placedBy: req.user }).populate('foodItem')
        console.log(Cart);
        console.log(Cart.length);
        res.status(200).json({
            status: 200,
            message: "Cart fetched successfully",
            data: Cart
        });
       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message
        });
    }
});
router.post("/update_status",async (req, res) =>
{
    const { id,status } = req.body;

    const updatedOrder = await Order.updateOne({ _id: id }, { $set: { status: status } }, { new: true })
    console.log(updatedOrder);

    res.send("Order status updated successfully");
})
export default router;
