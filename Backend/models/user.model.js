import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness at the schema level
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be at least 4 characters long.'],
        // maxlength: [20, 'Password cannot be more than 20 characters long.']
    },
    address: {
        type: String,
        default: null,
        required: true
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720915200&semt=ais_user"
    },
    phoneNo: {
        type:String,
        default: null,
        required: true
    },
    token:
    {
        type: String,
       
        },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
