import mongoose from "mongoose"




const orderSchema = new mongoose.Schema(
    {
      
        foodItem:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true
            
        },
        quantity:
        {
            type: Number,
            required: true,
            default: 0
        },
        placedBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status:
        {
            type: String,
           enum:["pending","delivered","cancelled"],
            default: "pending",
        }



    },
    {
        timestamps: true
    }
)


const Order = mongoose.model('order', orderSchema);
export { Order };