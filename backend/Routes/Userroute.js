const express = require('express');
const product_model = require('../Models/Productmodel');
const order_model = require('../Models/orderModel');
const Cart = require('../Models/Cartmodel');
const usermodel = require('../Models/User');
const orderModel = require('../Models/orderModel');
const contact_model = require('../Models/Contactmodel');
const Newsletter = require('../Models/Newsletter');
const user_route = express();

user_route.get("/single-product/:id",async(req,res)=>{
      try {
        const find_product=await product_model.findById({_id:req.params.id});
        if(!find_product){
            res.send({success:false,message:"Product not found!"})  
        }
        res.send({success:true,data:find_product})
      } catch (error) {
        console.log(error)
      }
})
// -----------find-product-by--------------category--------------------
user_route.get("/category-product/:category",async(req,res)=>{
  try {
    const find_product=await product_model.find({category:req.params.category});
    if(!find_product){
        res.send({success:false,message:"Product not found!"})  
    }
    console.log(find_product)
    res.send({success:true,data:find_product})
  } catch (error) {
    console.log(error)
  }
})
// ------------------order-model---------------------
// Create a new order
user_route.post("/create-order", async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      address,
      product,
      deliveryOption,
      deliveryCharge,
      totalAmount,
      notes,
    } = req.body;

    if (!customerName || !phoneNumber || !address || !product || !deliveryOption || !deliveryCharge || !totalAmount) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newOrder = new order_model({
      customerName,
      phoneNumber,
      address,
      product,
      deliveryOption,
      deliveryCharge,
      totalAmount,
      notes,
    });

    await newOrder.save();
    res.status(201).json({ 
      message: "Order placed successfully!", 
      order: newOrder 
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
    console.log(error)
  }
});
// Update order status


// --------------add-to-cart------------------------

// Add item to cart
user_route.post("/add-to", async (req, res) => {
  try {
      const { userId, productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId });

      if (!cart) {
          cart = new Cart({ userId, items: [{ productId, quantity }] });
      } else {
          const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
          if (itemIndex > -1) {
              cart.items[itemIndex].quantity += quantity;
          } else {
              cart.items.push({ productId, quantity });
          }
      }

      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Get user's cart
user_route.get("/:userId", async (req, res) => {
  try {
      const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      res.status(200).json(cart);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update cart item quantity
user_route.put("/update", async (req, res) => {
  try {
      const { userId, productId, quantity } = req.body;

      let cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
          cart.items[itemIndex].quantity = quantity;
      } else {
          return res.status(404).json({ message: "Product not found in cart" });
      }

      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
user_route.delete("/remove", async (req, res) => {
  try {
      const { userId, productId } = req.body;

      let cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.items = cart.items.filter(item => item.productId.toString() !== productId);

      await cart.save();
      res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Clear cart
user_route.delete("/clear/:userId", async (req, res) => {
  try {
      await Cart.findOneAndDelete({ userId: req.params.userId });
      res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

user_route.post("/add-to-cart", async (req, res) => {
  const { userId, productId, name, price, quantity, size, color, image } = req.body;
  console.log(req.body)
  try {
      const user = await usermodel.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      // Check if the product is already in the cart
      const existingProduct = user.cartData.find(item => item.productId.toString() === productId && item.size === size && item.color === color);

      if (existingProduct) {
          existingProduct.quantity += quantity; // Increase quantity if already exists
      } else {
          user.cartData.push({ productId, name, price, quantity, size, color, image });
      }

      await user.save();
      res.status(200).json({ success: true, message: "Product added to cart", cart: user.cartData });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.log(error)
  }
});
// Get Cart Data Route
user_route.get('/cart/:id', async (req, res) => {
  try {
    const user = await usermodel.findById({_id:req.params.id}); // Assuming `userId` is available from the middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      cartData: user.cartData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Remove a product from the cart
// Remove a product from the user's cart
user_route.delete("/cart/remove/:userId", async (req, res) => {
  const { userId } = req.params; // The user ID from the route
  const { productId } = req.body; // The product ID from the request body

  try {
    // Find the user by ID
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the product exists in the cart
    const productIndex = user.cartData.findIndex((item) => item.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    // Remove the product from the cart
    user.cartData.splice(productIndex, 1);

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true, message: "Product removed from cart", cartData: user.cartData });
  } catch (err) {
    console.error("Error removing product from cart", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

user_route.get("/user-info/:id",async(req,res)=>{
  try {
        const find_user=await usermodel.findById({_id:req.params.id});
        res.send({success:true,data:find_user})
  } catch (error) {
    console.log(error)
  }
})
// Track Order Route
// Track order by invoiceId
user_route.post('/track-my-order', async (req, res) => {
  const { billingNumber } = req.body;
  console.log(req.body)
  if (!billingNumber) {
    return res.status(400).json({ success: false, message: "Billing Number is required." });
  }

  try {
    const order = await order_model.find({phoneNumber: billingNumber });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error)
    console.error('Track order error:', error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});
// ----------contact-model--------------------------
// POST /api/contact
user_route.post("/contact", async (req, res) => {
  try {
    console.log("oooooo")
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !subject || !phone || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new contact_model({ name, email, subject, phone, message });
    await newMessage.save();

    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error." });
  }
});
// -------------newsletter--------------------------
user_route.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if already subscribed
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Successfully subscribed" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});
module.exports=user_route;