import React, {Component} from 'react'
import FaasosNav from './../components/nav'
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, UncontrolledAlert} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getDishNames} from './../actions/action_dish'
import  {orderNow} from './../actions/action_order'
import Select from 'react-select';
import ErrorMessage from './../messages/ErrorMessage'

class Home extends Component {

  state = {
    value: null,
    quantity: '',
    errors: {},
    success: false
  }

  componentDidMount(props) {
    this.props.getDishNames();
  }


  handleOnChange = (value) => {
			this.setState({ value });
  }

  handleTextChange = (e) => {
    this.setState({...this.state, [e.target.name] : e.target.value})
  }

  OrderNow = (e) => {
    e.preventDefault();

    if (this.state.value && this.state.quantity) {
      let chosen_dish = this.props.dishes.findIndex((dish) => {
        return dish.dish.value === this.state.value.value
      })
      let orderData  = {
        dish_id: this.props.dishes[chosen_dish]._id,
        quantity: this.state.quantity
      }
      this.props.orderNow(orderData)
          .then(
            response => {
              this.setState({success: true, value: null, quantity: ''})
            }
          ).catch(
            err => {
              console.log(err.response)
              if (err.response.data.error.errors.quantity) this.setState({errors: {...this.state, quantity: err.response.data.error.errors.quantity.message}})
              if (err.response.data.error.errors.dishId) this.setState({errors: {...this.state, quantity: err.response.data.error.errors.dishId.message}})
            }
          )

    } else {
      const errors = {};
      // if (!this.state.value || typeof this.state.value !== 'string') errors.dish = "Choose one dish"
      // if (this.state.quantity < 1 || typeof this.state.quantity !== 'number') errors.quantity = "should be valid number"
      // if (this.state.quantity === '') errors.quantity = "Quantity field is required"
      this.setState({errors})
    }
  }

  validate = data => {
    const errors = {};
    if (!data.dish_id) errors.dish = "Choose one dish"
    if (!data.quantity) errors.quantity = "Quantity is required"
    if (data.quantity < 1) errors.quantity = "Is that what you want to eat"
    return errors;
  }

  render () {
    const {value, quantity, errors, success} = this.state
    const {dishes} =this.props;

    let dishesArr = dishes.map((dish) => {
      return dish['dish']
    })


    return (
      <div>
        <Container>
        <FaasosNav />
        <h5>Order now :</h5>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Form onSubmit={this.OrderNow}>
              <FormGroup>
                <label>Choose a dish:</label>
                <Select
                  options={dishesArr}
                  onChange={this.handleOnChange}
        					value={value}
        				/>
                {errors.dish && <ErrorMessage text={errors.dish} />}
              </FormGroup>
              <FormGroup>
                <Label for="predicted_value">Quantity</Label>
                <Input type="text" name="quantity" id="quantity" value={quantity}  onChange={this.handleTextChange} placeholder="Quantity" />
                {errors.quantity && <ErrorMessage text={errors.quantity} />}
              </FormGroup>
              <Button color="primary">Order now</Button>
            </Form>
            <br />
            {success && <UncontrolledAlert color="success">
                          Your order has been placed
                        </UncontrolledAlert>}
          </Col>
        </Row>
        </Container>
      </div>
    )
  }
}

Home.propTypes = {
  getDishNames: PropTypes.func.isRequired,
  dishes: PropTypes.array.isRequired,
  orderNow: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    dishes: state.dishes
  }
}

export default connect(mapStateToProps, {getDishNames, orderNow})(Home);
