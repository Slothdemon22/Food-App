import express from "express"
import cors from "cors"
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { connectDB } from "./db/databaseConnection.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js"
import foodRoutes from "./routes/food.routes.js"
import cookieParser from "cookie-parser";

dotenv.config();





const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5174","https://deploy-mern-lwhq.vercel.pp"],
        methods:["POST","GET"],
        credentials: true
    }
));

connectDB();
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/food', foodRoutes);
app.listen(process.env.PORT, () => console.log("Server is running on port 3000"))
