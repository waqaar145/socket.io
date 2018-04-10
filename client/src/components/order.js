import React from 'react'
import {Button} from 'reactstrap'

const SingleOrder = ({order, OrderDone}) => {
  return (
    <tr>
      <td>{order.dish_detail[0].dish.value}</td>
      <td>{order.quantity}</td>
      <td>{order.dish_detail[0].createdTillNow}</td>
      <td>{order.dish_detail[0].predicted_value}</td>
      <td><Button color="primary" onClick={() => OrderDone(order._id)}>Done</Button></td>
    </tr>
  )
}

export default SingleOrder;
