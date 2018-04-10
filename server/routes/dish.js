var express = require('express');
const Dish = require('./../models/Dish');
var router = express.Router();


// 1)  Add a dish with predicted value
router.post('/dish', async (req, res, next) => {
  var dish = new Dish({
    dish: req.body.dish,
    predicted_value: req.body.predicted_value
  })

  // saving a dish with predicted value
  try {
    let newDish = await dish.save();
    return res.status(200).send(newDish)
  } catch (err) {
    return res.status(500).send({error: err})
  }

})

// 2) Get All dishnames
router.get('/dish', async (req, res, next) => {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);
  try {
    let dishes = await Dish.find({createdAt: {$gte: start, $lt: end}})
    return res.status(200).send(dishes)
  } catch (err) {
    return res.status(500).send({error: 'Error while fetching dishes names'})
  }
})

module.exports = router;
