import React from 'react';
import Select from 'react-select';
import FaasosNav from './../components/nav'
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, UncontrolledAlert} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveDish} from './../actions/action_dish'
import ErrorMessage from './../messages/ErrorMessage'

class AddProduct extends React.Component {
  state = {
    multi: false,
    options: [
				{ value: 'R', label: 'Red' },
				{ value: 'G', label: 'Green' },
				{ value: 'B', label: 'Blue' }
			],
    value: null,
    predicted_value: '',
    errors: {},
    loading: false,
    success: false
  }

  handleOnChange = (value) => {
			this.setState({ value });
  }

  handleTextChange = (e) => {
    this.setState({...this.state, [e.target.name] : e.target.value})
  }
  // saving product with predicted value

  saveProduce = (e) => {
    e.preventDefault();
    let dish = {
      dish: this.state.value,
      predicted_value: this.state.predicted_value
    }
    const errors = this.validate(dish);
    this.setState({errors: errors});
    if(Object.keys(errors).length === 0){
      this.props.saveDish(dish).then(
        response => {
            this.setState({success: true, value: null, predicted_value: ''})
        }
      ).catch(
        error => {
          this.setState({errors : {
            dish: error.response.data.error
          }})
        }
      )
    }
  }

  validate = data => {
    const errors = {};
    if (data.dish === null) errors.dish = "Dish field is required"
    if (!data.predicted_value) errors.predicted_value = "Predicted value is required"
    return errors;
  }



  render() {

    const {options, value, predicted_value, errors, success} = this.state;


    return (
      <div>
        <Container>
        <FaasosNav />
        <h5>Add product :</h5>
        <Row>
          <Col md={{ size: 4, offset: 4 }}>
            <Form onSubmit={this.saveProduce}>
              <FormGroup>
                <label>Dish name:</label>
                <Select.Creatable
        					options={options}
        					onChange={this.handleOnChange}
        					value={value}
        				/>
                {errors.dish && <ErrorMessage text={errors.dish} />}
              </FormGroup>
              <FormGroup>
                <Label for="predicted_value">Predicted value</Label>
                <Input type="number" name="predicted_value" id="predicted_value" value={predicted_value} onChange={this.handleTextChange} placeholder="Predicted value" />
                {errors.predicted_value && <ErrorMessage text={errors.predicted_value} />}
              </FormGroup>
              <Button color="primary">Save Dish</Button>
            </Form>
            <br />
            {success && <UncontrolledAlert color="success">
                          Success, Dish is saved with predicted value
                        </UncontrolledAlert>}
          </Col>
        </Row>
        </Container>
      </div>
    );
  }
}


AddProduct.propTypes = {
  saveDish: PropTypes.func.isRequired
}

export default connect(null, {saveDish})(AddProduct);
