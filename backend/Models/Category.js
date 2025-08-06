const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    numberOfProducts: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);
const category_model= mongoose.model('Category', CategorySchema);

module.exports =category_model;
