const asyncHandler = require('express-async-handler');
const Coupon = require('../Models/Coupon');

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const {
    code,
    discountType,
    discountValue,
    minOrderAmount,
    maxDiscountAmount,
    startDate,
    endDate,
    maxUses,
    applicableCategories,
    applicableProducts,
    admin_id
  } = req.body;

  // Check if coupon code already exists
  const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (existingCoupon) {
    return res.status(400).json({ message: 'Coupon code already exists' });
  }

  const newCoupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType,
    discountValue,
    minOrderAmount: minOrderAmount || 0,
    maxDiscountAmount: maxDiscountAmount || null,
    startDate,
    endDate,
    maxUses: maxUses || null,
    applicableCategories,
    applicableProducts,
    createdBy:admin_id
  });

  res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error)
  }
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort('-createdAt');
  res.json(coupons);
});

// @desc    Get single coupon
// @route   GET /api/coupons/:id
// @access  Private/Admin
const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
console.log(id)
  const coupon = await Coupon.findOne({code:id});
  if (!coupon) {
    return res.status(404).json({ message: 'Coupon not found' });
  }

  res.json(coupon);
});

// @desc    Update coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const coupon = await Coupon.findById(id);
  if (!coupon) {
    return res.status(404).json({ message: 'Coupon not found' });
  }

  // Prevent changing code if it's already been used
  if (req.body.code && coupon.currentUses > 0) {
    return res.status(400).json({ message: 'Cannot change code of a coupon that has been used' });
  }

  if (req.body.code) {
    const existingCoupon = await Coupon.findOne({ code: req.body.code.toUpperCase() });
    if (existingCoupon && existingCoupon._id.toString() !== id) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }
    req.body.code = req.body.code.toUpperCase();
  }

  const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedCoupon);
});

// @desc    Delete coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);



  await Coupon.findByIdAndDelete(id);
  res.json({ message: 'Coupon deleted successfully' });
});

// @desc    Validate coupon
// @route   POST /api/coupons/validate
// @access  Private
const validateCoupon = asyncHandler(async (req, res) => {
  const { code, cartTotal, productIds } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Coupon code is required' });
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    return res.status(404).json({ message: 'Invalid coupon code' });
  }

  // Check if coupon is active
  if (!coupon.isActive) {
    return res.status(400).json({ message: 'Coupon is not active' });
  }

  // Check date validity
  const now = new Date();
  if (now < coupon.startDate) {
    return res.status(400).json({ message: 'Coupon is not yet valid' });
  }
  if (now > coupon.endDate) {
    return res.status(400).json({ message: 'Coupon has expired' });
  }

  // Check usage limits
  if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
    return res.status(400).json({ message: 'Coupon usage limit reached' });
  }

  // Check minimum order amount
  if (cartTotal < coupon.minOrderAmount) {
    return res.status(400).json({ 
      message: `Minimum order amount of ${coupon.minOrderAmount} required for this coupon`
    });
  }

  // Check product restrictions
  if (coupon.applicableProducts && coupon.applicableProducts.length > 0) {
    const validProduct = productIds.some(productId => 
      coupon.applicableProducts.includes(productId)
    );
    if (!validProduct) {
      return res.status(400).json({ 
        message: 'Coupon is not applicable to any products in your cart'
      });
    }
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = (cartTotal * coupon.discountValue) / 100;
    if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
      discountAmount = coupon.maxDiscountAmount;
    }
  } else {
    discountAmount = coupon.discountValue;
  }

  res.json({
    valid: true,
    coupon: {
      id: coupon._id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      maxDiscountAmount: coupon.maxDiscountAmount
    }
  });
});

module.exports = {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon
};