const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    cartData: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number, default: 1 },
            size: { type: String },
            color: { type: String },
            image: { type: String }
        }
    ],
    address: { type: String },
    verified: { type: Number, default: 1 },
    is_admin: { type: Number, default: 1 }
}, { timestamps: true });

const usermodel = mongoose.model("User", userschema);
module.exports = usermodel;
