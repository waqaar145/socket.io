const mongoose = require('mongoose');
const Dish = require('./../models/Dish');

const OrderSchema = new mongoose.Schema({
  dishId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  },
  quantity : {
    type  : Number,
    required: true,
    min: [1, 'Should be valid number']
  },
  status : {
    type: Boolean,
    default: false
  }
},{timestamps : true})

module.exports = mongoose.model("Order", OrderSchema);
