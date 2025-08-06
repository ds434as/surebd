const express = require('express');
const Couponrouter = express.Router();
const couponController = require('../Controllers/couponController');
const Coupon = require('../Models/Coupon');
const asyncHandler = require('express-async-handler');

// Admin routes
Couponrouter.post('/', couponController.createCoupon);
Couponrouter.get('/', couponController.getAllCoupons);
Couponrouter.get('/:id',couponController.getCoupon);
Couponrouter.put('/:id', couponController.updateCoupon);
Couponrouter.delete('/:id', couponController.deleteCoupon);
// Get all coupons
Couponrouter.get('/', asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort('-createdAt');
  res.json(coupons);
}));

// Get coupon by code
Couponrouter.get('/:code', asyncHandler(async (req, res) => {
  const { code } = req.params;
  
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return res.status(404).json({ message: 'Coupon not found' });
  }

  res.json(coupon);
}));

// Apply coupon (optional - you can use the GET route above instead)
Couponrouter.post('/apply', asyncHandler(async (req, res) => {
 try {
     const { code, orderAmount } = req.body;
  
  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return res.status(404).json({ message: 'Coupon not found' });
  }
  
  // Validate coupon
  const now = new Date();
  const startDate = new Date(coupon.startDate);
  const endDate = new Date(coupon.endDate);
  
  if (!coupon.isActive) {
    return res.status(400).json({ message: 'This coupon is not active' });
  }
  
  if (now < startDate) {
    return res.status(400).json({ message: 'This coupon is not valid yet' });
  }
  
  if (now > endDate) {
    return res.status(400).json({ message: 'This coupon has expired' });
  }
  
  if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
    return res.status(400).json({ 
      message: `Minimum order amount is ${coupon.minOrderAmount}`
    });
  }
  
  if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
    return res.status(400).json({ message: 'This coupon has reached its usage limit' });
  }
  
  res.json(coupon);
 } catch (error) {
    console.log(error)
 }
}));
// User route for validation
Couponrouter.post('/validate',  couponController.validateCoupon);

module.exports = Couponrouter;