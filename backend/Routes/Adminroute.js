const express = require("express");
const multer = require("multer");
const path = require("path");
const category_model = require("../Models/Category");
const admin_route = express();
const { body, validationResult } = require("express-validator");
const product_model = require("../Models/Productmodel");
const brand_model = require("../Models/Brandmodel");
const usermodel = require("../Models/User");
const orderModel = require("../Models/orderModel");
const carousel_model = require("../Models/Carouselmodel");
const fs = require("fs");
const blog_model = require("../Models/Blogmodel");
const Review_model = require("../Models/Reviewmodel");
const contact_model = require("../Models/Contactmodel");
const Order = require("../Models/orderModel");
const Product = require("../Models/Productmodel");
const Coupon = require("../Models/Coupon");
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


admin_route.get("/", (req, res) => {
  res.send("Admin Route");
});

// Use Multer to handle the image upload in the category route
// admin_route.post("/category", upload.single("file"), async (req, res) => {

//     console.log("hello")
//     // const { title, numberOfProducts } = req.body;
//     // console.log(req.image)
//     // const newCategory = new category_model({ title, image, numberOfProducts });
//     // await newCategory.save();
//     // res.status(201).json({ message: "Category created successfully", category: newCategory });

// });
admin_route.post("/category",uploadimage.single("file"),(req,res)=>{
  try {
     const {title,numberOfProducts}=req.body;
     const new_category=new category_model({
      title,numberOfProducts,
      image:req.file.filename
     });
     new_category.save();
     res.send({success:true,message:"Ok"})

  } catch (error) {
    console.log(error)
  }
})
admin_route.get("/category",async(req,res)=>{
  try {
    const category=await category_model.find();
    res.send({success:true,data:category})
  } catch (error) {
    console.log(error)
  }
})
admin_route.delete("/delete-category/:id",async(req,res)=>{
  try{
    const delete_category=await category_model.findByIdAndDelete({_id:req.params.id});
    if(!delete_category){
     return  res.send({success:false,message:"Category  did not find!"})
    };
    res.send({success:true,message:"Category has been deleted!"})
  }catch(err){
      console.log(err)
  }
});
admin_route.put("/update-category/:id", uploadimage.single("file"), async (req, res) => {
  try {
    const { title, numberOfProducts } = req.body;
    const updateData = { title, numberOfProducts };

    // If a new file (image) is uploaded, include it in the update
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedCategory = await category_model.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCategory) {
      return res.send({ success: false, message: "Category not found!" });
    }

    res.send({ success: true, message: "Category updated successfully!", data: updatedCategory });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong!" });
  }
});

// --------------------add-brand-------------------
admin_route.post("/add-brand",uploadimage.single("file"),(req,res)=>{
  try {
     const {title,numberOfProducts}=req.body;
     const new_brand=new brand_model({
      title,numberOfProducts,
      image:req.file.filename
     });
     new_brand.save();
     res.send({success:true,message:"Ok"})
  } catch (error) {
    console.log(error)
  }
})
admin_route.get("/brands",async(req,res)=>{
  try {
    const brands=await brand_model.find();
    res.send({success:true,data:brands})
  } catch (error) {
    console.log(error)
  }
})
admin_route.delete("/delete-brand/:id",async(req,res)=>{
  try{
    const delete_brand=await brand_model.findByIdAndDelete({_id:req.params.id});
    if(!delete_brand){
     return  res.send({success:false,message:"Brand  did not find!"})
    };
    res.send({success:true,message:"Brand has been deleted!"})
  }catch(err){
      console.log(err)
  }
});
admin_route.put("/update-brand/:id", uploadimage.single("file"), async (req, res) => {
  try {
    const { title, numberOfProducts } = req.body;
    const updateData = {
      title,
      numberOfProducts,
    };

    // If a new image is uploaded, include it in the update
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedBrand = await brand_model.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBrand) {
      return res.send({ success: false, message: "Brand not found!" });
    }

    res.send({ success: true, message: "Brand has been updated!", data: updatedBrand });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong!" });
  }
});

// ----------------all-user---------------------------
admin_route.get("/users",async(req,res)=>{
  try {
     const all_users=await usermodel.find();
     if(!all_users){
      return res.send({success:false,message:"Something went wrong!"})
     }
     console.log(all_users)
     res.send({success:true,message:"Ok",data:all_users})
  } catch (error) {
    console.log(error)
  }
})
// Get all users
admin_route.get("/users", async (req, res) => {
  try {
    const all_users = await usermodel.find();
    if (!all_users) {
      return res.send({ success: false, message: "Something went wrong!" });
    }
    res.send({ success: true, message: "Ok", data: all_users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// Delete user by ID
admin_route.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await usermodel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.send({ success: false, message: "User not found!" });
    }
    res.send({ success: true, message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// Update user by ID
admin_route.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.send({ success: false, message: "User not found!" });
    }
    res.send({ success: true, message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// -----------add-product------------------


admin_route.post(
  "/add-product",
  uploadimage.array("images", 5), // Max 5 images
  [
    body("productName").notEmpty().withMessage("Product name is required"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body("youtubeVideo").optional().isURL().withMessage("Invalid YouTube video URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { 
        productName, 
        brand, 
        category, 
        sizes, 
        colors, 
        description, 
        stock, 
        price, 
        oldPrice, 
        discount, 
        productType,
        tax, 
        flashSale, 
        flashSalePrice, 
        flashSaleStart, 
        flashSaleEnd,
        youtubeUrl // new field
      } = req.body;
    console.log(req.body)
      const sizesArray = sizes ? sizes.split(",").map(size => size.trim()) : [];
      const colorsArray = colors ? colors.split(",").map(color => color.trim()) : [];

      const flashSaleData = flashSale === "true" ? {
        flashSale: true,
        flashSalePrice: flashSalePrice ? parseFloat(flashSalePrice) : undefined,
        flashSaleStart: flashSaleStart ? new Date(flashSaleStart) : undefined,
        flashSaleEnd: flashSaleEnd ? new Date(flashSaleEnd) : undefined,
      } : {
        flashSale: false,
      };

      const newProduct = new product_model({
        productName,
        brand,
        category,
        sizes: sizesArray,
        colors: colorsArray,
        description,
        stock: stock ? parseInt(stock) : 0,
        price: parseFloat(price),
        product_type: productType,
        oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
        discount: discount ? parseFloat(discount) : undefined,
        tax: tax ? parseFloat(tax) : undefined,
        youtubeVideo: youtubeUrl || "", // Add YouTube video link if provided
        ...flashSaleData,
        images: req.files.map((file) => file.filename),
      });

      await newProduct.save();

      res.status(201).json({ message: "Product created successfully", product: newProduct });
      console.log("Product created:", newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

admin_route.get("/all-products",async(req,res)=>{
  try {
    const products=await product_model.find();
    res.send({success:true,data:products})
  } catch (error) {
    console.log(error)
  }
})
admin_route.delete("/delete-product/:id",async(req,res)=>{
  try{
    const delete_product=await product_model.findByIdAndDelete({_id:req.params.id});
    if(!delete_product){
     return  res.send({success:false,message:"Product  did not find!"})
    };
    res.send({success:true,message:"Product has been deleted!"})
  }catch(err){
      console.log(err)
  }
});
// ------------update-product----------------

admin_route.put(
  "/update-product/:id",
  uploadimage.array("images", 5), // Optional image upload
  [
    body("productName").optional().notEmpty().withMessage("Product name is required"),
    body("brand").optional().notEmpty().withMessage("Brand is required"),
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body("youtubeVideo").optional().isURL().withMessage("Invalid YouTube video URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body)
      const productId = req.params.id;
      const existingProduct = await product_model.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      const {
        productName,
        brand,
        category,
        sizes,
        colors,
        description,
        stock,
        price,
        oldPrice,
        discount,
        productType,
        tax,
        flashSale,
        flashSalePrice,
        flashSaleStart,
        flashSaleEnd,
        youtubeVideo,
      } = req.body;

      const sizesArray = sizes ? sizes.split(",").map(size => size.trim()) : existingProduct.sizes;
      const colorsArray = colors ? colors.split(",").map(color => color.trim()) : existingProduct.colors;

      const flashSaleData = flashSale === "true" ? {
        flashSale: true,
        flashSalePrice: flashSalePrice ? parseFloat(flashSalePrice) : existingProduct.flashSalePrice,
        flashSaleStart: flashSaleStart ? new Date(flashSaleStart) : existingProduct.flashSaleStart,
        flashSaleEnd: flashSaleEnd ? new Date(flashSaleEnd) : existingProduct.flashSaleEnd,
      } : {
        flashSale: false,
        flashSalePrice: undefined,
        flashSaleStart: undefined,
        flashSaleEnd: undefined,
      };

      const updatedData = {
        ...(productName && { productName }),
        ...(brand && { brand }),
        ...(category && { category }),
        ...(description && { description }),
        ...(stock && { stock: parseInt(stock) }),
        ...(price && { price: parseFloat(price) }),
        ...(oldPrice && { oldPrice: parseFloat(oldPrice) }),
        ...(discount && { discount: parseFloat(discount) }),
        ...(tax && { tax: parseFloat(tax) }),
        ...(productType && { product_type: productType }),
        ...(youtubeVideo && { youtubeVideo }),
        sizes: sizesArray,
        colors: colorsArray,
        ...flashSaleData,
      };

      if (req.files.length > 0) {
        updatedData.images = req.files.map((file) => file.filename);
      }

      const updatedProduct = await product_model.findByIdAndUpdate(productId, updatedData, {
        new: true,
      });

      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
);

// ------------------------update-product------------------
admin_route.get("/flash-products",async(req,res)=>{
  try {
    const products=await product_model.find({flashSale:true});
    res.send({success:true,data:products})
  } catch (error) {
    console.log(error)
  }
});
admin_route.get("/new-arrival-products",async(req,res)=>{
  try {
    const products=await product_model.find({product_type:"New Arrival"});
    res.send({success:true,data:products})
  } catch (error) {
    console.log(error)
  }
});
admin_route.get("/category-products/:category",async(req,res)=>{
  try {
    const products=await product_model.find({category:req.params.category});
    res.send({success:true,data:products})
  } catch (error) {
    console.log(error)
  }
})
// ----------------order-data----------------
// Get all orders
admin_route.get("/orders", async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 }); // Fetch all orders sorted by latest
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error, unable to fetch orders" });
  }
});

// Get a single order by ID
admin_route.get("/orders/:id", async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error, unable to fetch order" });
  }
});
admin_route.put("/update-order/:id", async (req, res) => {
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

    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
        phoneNumber,
        address,
        product,
        deliveryOption,
        deliveryCharge,
        totalAmount,
        notes,
      },
      { new: true } // return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({
      message: "Order updated successfully!",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
    console.log(error);
  }
});

// Update order status
admin_route.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status input
    // const validStatuses = ["Pending", "Processing", "Shipped", "Completed", "Cancelled"];
    // if (!validStatuses.includes(status)) {
    //   return res.status(400).json({ message: "Invalid status value" });
    // }

    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Delete an order by ID
admin_route.delete("/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error, unable to delete order" });
  }
});

// ------------carousel-uplaod----------------

// Route to upload multiple images
admin_route.post(
  "/upload",
  uploadimage.array("images", 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      // Extract filenames and paths from uploaded files
      const filenames = req.files.map((file) => file.filename);
      const paths = req.files.map((file) => `${file.filename}`);

      // Find the existing document (if any)
      let existingImageSet = await carousel_model.findOne();

      // If no document exists, create a new one
      if (!existingImageSet) {
        existingImageSet = new carousel_model({ filenames, paths });
        await existingImageSet.save();
      } else {
        // Add the new images to the existing arrays
        existingImageSet.filenames.push(...filenames);
        existingImageSet.paths.push(...paths);
        await existingImageSet.save();
      }

      res.json({
        message: "Images uploaded successfully",
        images: existingImageSet,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error uploading images", error });
    }
  }
);

// Route to get all uploaded images (for slider)
// GET route to fetch images
admin_route.get("/banners", async (req, res) => {
  try {
    // Find the image document in the database
    const imageSet = await carousel_model.findOne();

    // Check if the imageSet exists
    if (!imageSet) {
      return res.status(404).json({ message: "No images found" });
    }

    // Send the filenames in the response
    res.json({ filenames: imageSet.filenames });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: "Error fetching banners", error });
  }
});
// Delete a single image
admin_route.delete("/banners/:imageName", async (req, res) => {
  const { imageName } = req.params;

  try {
    // Find the carousel entry
    const carousel = await carousel_model.findOne({});

    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    // Find the index of the image to delete
    const imageIndex = carousel.filenames.indexOf(imageName);
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove the image from the filenames and paths arrays
    carousel.filenames.splice(imageIndex, 1);
    carousel.paths.splice(imageIndex, 1);

    // Delete the actual image file from the server
    const filePath = path.join(__dirname, "public", "images", imageName); // Adjust the path if necessary
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file from the server
    }

    // Save the updated carousel record
    await carousel.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image", error });
  }
});
// ----------------------blog----------------
admin_route.get('/blogs', async (req, res) => {
  try {
    const blogs = await blog_model.find().sort({ date: -1 });
    res.json({success:true,blogs});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get a blog by ID
admin_route.get('/blog/:id', async (req, res) => {
  try {
    const blog = await blog_model.findById(req.params.id);
    if (!blog) return res.json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /blogs
// @desc    Create a new blog
admin_route.post('/add-blog',uploadimage.single("image"),async (req, res) => {
  const { title, excerpt, content, image, category } = req.body;
  try {
    const newBlog = new blog_model({ title, excerpt, content, image:req.file.filename, category });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /blogs/:id
// @desc    Update a blog
admin_route.put('/update-blog/:id', async (req, res) => {
  const { title, excerpt, content, image, category } = req.body;
  try {
    const updatedBlog = await blog_model.findByIdAndUpdate(
      req.params.id,
      { title, excerpt, content, image, category },
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /blogs/:id
// @desc    Delete a blog
admin_route.delete('/delete-blog/:id', async (req, res) => {
  try {
    const blog = await blog_model.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ------------------------review-model-------------------------
// GET: Fetch all reviews for a specific product
admin_route.get('/review/:productId', async (req, res) => {
  try {
    const reviews = await Review_model.find({ product_id: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

// POST: Add a new review
admin_route.post('/review/add', async (req, res) => {
  const { product_id, user_id, name, comment, rating } = req.body;

  try {
    const newReview = new Review_model({ product_id, user_id, name, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add review.' });
  }
});
// GET all reviews
admin_route.get('/review/all', async (req, res) => {
  try {
    const reviews = await Review_model.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});

// PATCH: Update review status
admin_route.patch('/review/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Review_model.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to update status.' });
  }
});

// DELETE: Delete a review
admin_route.delete('/review/delete/:id', async (req, res) => {
  try {
    await Review_model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: 'Failed to delete review.' });
  }
});
// ---------------contact-------------------------
// Get all contacts
admin_route.get("/contact", async (req, res) => {
  try {
   console.log("hello")
  }catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});
// Delete a contact by IDerror
admin_route.delete("/contact/:id", async (req, res) => {
  try {
    const contact = await contact_model.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// ---------------------dashboard---------------------------

// Dashboard Statistics
admin_route.get('/dashboard-stats', async (req, res) => {
  try {
    // Get counts for all models
    const [
      totalCategories,
      totalProducts,
      totalReviews,
      totalOrders,
      totalBrands,
      totalUsers,
      totalCoupons,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      canceledOrders,
      outOfStockProducts,
      flashSaleProducts,
      adminUsers,
      regularUsers
    ] = await Promise.all([
      category_model.countDocuments(),
      Product.countDocuments(),
      Review_model.countDocuments(),
      Order.countDocuments(),
      brand_model.countDocuments(),
      usermodel.countDocuments(),
      Coupon.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ status: 'processing' }),
      Order.countDocuments({ status: 'delivered' }),
      Order.countDocuments({ status: 'canceled' }),
      Product.countDocuments({ stock: 0 }),
      Product.countDocuments({ flashSale: true }),
      usermodel.countDocuments({ is_admin: 1 }),
      usermodel.countDocuments({ is_admin: 0 })
    ]);

    // Get sales data for charts
    const salesData = await Order.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Get product category distribution
    const categoryDistribution = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get top selling products
    const topSellingProducts = await Product.find()
      .sort({ sales: -1 })
      .limit(5)
      .select('productName sales price images');

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('invoiceId customerName totalAmount status createdAt');

    // Get review statistics
    const reviewStats = await Review_model.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: {
              rating: "$rating",
              count: 1
            }
          }
        }
      },
      {
        $project: {
          averageRating: 1,
          totalReviews: 1,
          ratingDistribution: {
            $reduce: {
              input: "$ratingDistribution",
              initialValue: [
                { rating: 1, count: 0 },
                { rating: 2, count: 0 },
                { rating: 3, count: 0 },
                { rating: 4, count: 0 },
                { rating: 5, count: 0 }
              ],
              in: {
                $map: {
                  input: "$$value",
                  as: "item",
                  in: {
                    $cond: [
                      { $eq: ["$$item.rating", "$$this.rating"] },
                      { rating: "$$item.rating", count: { $add: ["$$item.count", 1] } },
                      "$$item"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    ]);

    res.json({
      counts: {
        categories: totalCategories,
        products: totalProducts,
        reviews: totalReviews,
        orders: totalOrders,
        brands: totalBrands,
        users: totalUsers,
        coupons: totalCoupons,
        pendingOrders,
        processingOrders,
        deliveredOrders,
        canceledOrders,
        outOfStockProducts,
        flashSaleProducts,
        adminUsers,
        regularUsers
      },
      charts: {
        salesData,
        categoryDistribution
      },
      topSellingProducts,
      recentOrders,
      reviewStats: reviewStats[0] || {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: [
          { rating: 1, count: 0 },
          { rating: 2, count: 0 },
          { rating: 3, count: 0 },
          { rating: 4, count: 0 },
          { rating: 5, count: 0 }
        ]
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});
module.exports = admin_route;
