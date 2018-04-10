import React, {Component} from 'react'
import FaasosNav from './../components/nav'
import {Container, Table, Row, Col} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getAllOrders, donePreparingDish} from './../actions/action_order'
import SingleOrder from './../components/order'

class KitchenDisplay extends Component {

  componentDidMount(props) {
    this.props.getAllOrders()
  }

  OrderDone = (order_id) => {
    this.props.donePreparingDish(order_id)
  }

  render () {

    const { orders } = this.props;

    let order;
    if (orders.length > 0) {
       order = orders.map((order) => {
        return (
          <SingleOrder
            key={order._id}
            order={order}
            OrderDone={this.OrderDone}
          />
        )
      })
    }

    let current_date = new Date()

    const month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
      <div>
        <FaasosNav />
        <Container>
          <h5>Kitchen Display  -  </h5>
          <p className="pull-right">{current_date.getDate()} {month[current_date.getMonth()]}, {current_date.getFullYear()}</p>
          <br/>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Created-till-now</th>
                    <th>Predicted</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {order}
                </tbody>
              </Table>

            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

KitchenDisplay.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  donePreparingDish: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    orders: state.orders
  }
}


export default connect(mapStateToProps, {getAllOrders, donePreparingDish})(KitchenDisplay);
