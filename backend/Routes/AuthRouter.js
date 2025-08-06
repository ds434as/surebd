const { signup, login, profile_update } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation")
const multer=require("multer")
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer");
const usermodel = require("../Models/User")
const ensureAuthenticated = require('../Middlewares/Auth');
// ------------file-upload----------
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});

router.post('/login', loginValidation, login);
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user:process.env.EMAIL_ID, // Your email address
    pass:process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});
const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: 'Welcome to Our Platform!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
             
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(email)
        const user = await usermodel.findOne({ email });
        if (user) {
            return res.json({ message: 'User already exists, you can login', success: false });
        }
        const user_info = new usermodel({ username:name, email, password, phone:phone });
        user_info.password = await bcrypt.hash(password, 10);
        await user_info.save();

        // Send welcome email
        await sendWelcomeEmail(email, name);

        res.json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
        console.log(err);
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        // Check if user exists
        const user = await usermodel.findById(id);
        if (!user) {
            return res.json({ 
                message: 'User not found', 
                success: false 
            });
        }

        // If password is being updated, hash the new password
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // If email is being updated, check if new email already exists
        if (updates.email && updates.email !== user.email) {
            const emailExists = await usermodel.findOne({ email: updates.email });
            if (emailExists) {
                return res.status(400).json({ 
                    message: 'Email already in use', 
                    success: false 
                });
            }
        }

        // Update the user
        const updatedUser = await usermodel.findByIdAndUpdate(
            id, 
            { $set: updates }, 
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from the returned user object

        res.json({
            message: "User updated successfully",
            success: true,
            user: updatedUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});
router.get('/admin/:id', async (req, res) => {
    try {
        const { id } = req.params;
            console.log(id)
        // Find the user by ID and exclude the password field
        const user = await usermodel.findById(id);
        console.log(user)
        res.json({
            message: "User retrieved successfully",
            success: true,
            user
        });
    } catch (err) {
        console.error(err);
        
  
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});
router.put("/update-profile",ensureAuthenticated,profile_update)
module.exports = router;