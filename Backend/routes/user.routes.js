import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const options =
{
    maxAge: 10* 60 * 1000,
    httpOnly: true
}

const router = express.Router();
 
router.post("/logout", (req, res) => {
    
    res.clearCookie('token'); 

    // Optionally, you can send a success message
    res.status(200).json({ message: "Logout successful!" });
});


router.post('/register', async (req, res) => {
    const existedUser= await User.findOne({email: req.body.email});
    if(existedUser){
        return res.status(400).json({
            status : 400,
            message: "User already exists"
        });
    }
    const { username, email, password, phoneNo, address } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
   
    const createdUser = await new User({
        username,
        email,
        password: hashedPassword,
        phoneNo,
        address,
    });
 
    const token = await jwt.sign({
        id: createdUser._id,
        email: email,
    }, process.env.SECRET_KEY);

    createdUser.token = token;
    await createdUser.save();

    res.status(201).json({
        status : 201,
        message: "User created successfully",
        data: createdUser
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === process.env.adminMail && password === process.env.adminPassword) {
            const token = await jwt.sign({
                id: process.env.adminId,
                email: process.env.adminMail,
            }, process.env.SECRET_KEY);

            res.cookie("token", token, options);
            return res.status(200).json({
                status: 200,
                auth: "admin",
                message: "Admin logged in successfully"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: 401,
                auth: "false",
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                auth: "false",
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email,
        }, process.env.SECRET_KEY);

        res.cookie("token", token, options);

        res.status(200).json({
            status: 200,
            auth: "user",
            message: "Logged in successfully"
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


export default router;
