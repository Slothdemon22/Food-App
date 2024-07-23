import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    
    foodImage:
    {
        type: String,
        required: true
    },

    foodName:
    {
        type: String,
        required: true
    },
    foodPrice:
    {
        type: Number,
        required: true,
    },
    foodDescription:
    {
        type: String,
        required: true
    },




})
const Food = mongoose.model('food', foodSchema);
export { Food };