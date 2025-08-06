const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  product: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    image: {
      type: String
    },
  },
  deliveryOption: {
    type: String,
    enum: ["ঢাকা সিটির বাইরে", "ঢাকা সিটির মধ্যে"],
    required: true
  },
  deliveryCharge: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ["processing", "ready to ship", "shipping", "Delivered", "canceled"],
    default: "processing"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Helper function to generate a random 6-character alphanumeric ID
function generateInvoiceId(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Pre-validate hook to generate a unique 6-character invoiceId
orderSchema.pre('validate', async function (next) {
  if (this.isNew && !this.invoiceId) {
    try {
      let unique = false;
      let newId;
      while (!unique) {
        newId = generateInvoiceId();
        const existing = await this.constructor.findOne({ invoiceId: newId });
        if (!existing) {
          unique = true;
        }
      }
      this.invoiceId = newId;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Add index for faster invoiceId lookups
orderSchema.index({ invoiceId: 1 }, { unique: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
