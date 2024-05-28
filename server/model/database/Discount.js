import mongoose from "mongoose";

const oderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  discountAmount: {
    type: Number,
    min: 0,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
  },
  selled: {
    type: Number,
},
});

const disCount = mongoose.model('disCount',oderSchema)

export default disCount
