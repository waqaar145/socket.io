var express = require('express');
const Order = require('./../models/Order');
const Dish = require('./../models/Dish');
const mongoose = require('mongoose');
var socket = require('socket.io');
var router = express.Router();


router.get('/test', ( req, res, next ) => {
  return res.send({message: 'Server is up'})
})


// 1)  Add a dish with predicted value
router.post('/order', async (req, res, next) => {

  // Order
  try {
    let currentDish = await Dish.findOne({_id: req.body.dish_id})

    if (currentDish) {
      var order = new Order({
        dishId: req.body.dish_id,
        quantity: parseInt(req.body.quantity)
      })

      let newOrder = await order.save();
      var fetch_Order = [
        {
          $match: {
            _id: mongoose.Types.ObjectId(newOrder._id),
            status: false
          }
        },
        {
            "$lookup":
                {
                    from: "dishes",
                    localField: "dishId",
                    foreignField: "_id",
                    as: "dish_detail"
                }
        }
      ];
      let fetchedOrder = await Order.aggregate(fetch_Order)
      io.emit('AddNewOrder', fetchedOrder);
      return res.status(200).send(fetchedOrder)
    }

  } catch (err) {
    return res.status(500).send({error: err})
  }

})

router.get('/order', async (req, res, next) => {

  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);
  var fetch_Order = [
    {
      $match: {
        status: false,
        createdAt: {$gte: start, $lt: end}
      }
    },
    {
        "$lookup":
            {
                from: "dishes",
                localField: "dishId",
                foreignField: "_id",
                as: "dish_detail"
            }
    }
  ];

  try {
    let orders = await Order.aggregate(fetch_Order);
    return res.status(200).send(orders)
  } catch(err) {
    return res.status(500).send({error: 'Error while fetching orders'})
  }
})

router.put('/order/:id', async (req, res, next) => {
  let currentOrder = await Order.findOne({_id: req.params.id})
  let dish = await Dish.findOne({_id: currentOrder.dishId})

  try {

    let orderUpdated = await Order.findOneAndUpdate({_id: req.params.id}, {status: true}, {new: true})
    let dishUpdate = await Dish.findOneAndUpdate({_id: currentOrder.dishId}, {createdTillNow: dish.createdTillNow + currentOrder.quantity}, {new: true})
    io.emit('RemoveOrderFromKitchen', {order :orderUpdated, dish: dishUpdate});
    return res.status(200).send({order :orderUpdated, dish: dishUpdate})

  } catch(err) {
    return res.status(500).send({error: 'Error while updating order'})
  }
})


module.exports = router;
