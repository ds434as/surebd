const mongoose = require('mongoose');

const Brandschema = new mongoose.Schema(
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
const brand_model= mongoose.model('Brand', Brandschema);

module.exports =brand_model;
