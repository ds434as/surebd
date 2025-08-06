const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    weight: { type: String },
    category: { type: String, required: true },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    description: { type: String },
    flashSale: { type: Boolean, default: false },
    tagNumber: { type: String },
    product_type: { type: String },
    stock: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: Number },
    tax: { type: Number },
    images: { type: [String], default: [] },
    flashSalePrice: { type: Number },
    flashSaleStart: { type: Date },
    flashSaleEnd: { type: Date },
    youtubeVideo: { type: String }, // New field for YouTube video link
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
