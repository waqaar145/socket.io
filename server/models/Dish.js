const mongoose = require('mongoose');


const DishSchema = new mongoose.Schema({
  dish : {
    type  : Object,
    required: true
  },
  predicted_value : {
    type  : Number,
    required: true,
    min: [1, 'Should be valid number']
  },
  createdTillNow : {
    type  : Number,
    default: 0,
    min: 0
  },
},{timestamps : true})

module.exports = mongoose.model("Dish", DishSchema);
