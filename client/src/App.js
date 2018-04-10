import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Home from './pages/home'
import KitchenDisplay from './pages/kitchen_display'
import SampleReport from './pages/sample_report'
import AddProduct from './pages/add_product'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import io from "socket.io-client";
import {AddNewOrderToEveryKT, RemoveOrder, UpdaetSampleReport} from './actions/action_order'


class App extends React.Component {

  constructor(props){
      super(props);
      this.state = {

      }
      this.socket = io('http://localhost:8001');

      // adding a order in the kitchen
      this.socket.on('AddNewOrder', function(data){
            addOrderInKitchen(data)
      });


      const addOrderInKitchen = data => {
           this.props.AddNewOrderToEveryKT(data)
      };

      // removing a order from kitchen after it gets done
      this.socket.on('RemoveOrderFromKitchen', function (data) {
        updateSampleReport(data)
        removeOrderFromKitchen(data)
      });

      const removeOrderFromKitchen = data => {
           this.props.RemoveOrder(data)
      };

      const updateSampleReport = data => {
           this.props.UpdaetSampleReport(data.dish)
      };

    }




  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/kitchen-display" component={KitchenDisplay} />
          <Route path="/sample-report" component={SampleReport} />
          <Route path="/add-dish" component={AddProduct} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  AddNewOrderToEveryKT: PropTypes.func.isRequired
}


export default withRouter(connect(null, {AddNewOrderToEveryKT, RemoveOrder, UpdaetSampleReport})(App));
