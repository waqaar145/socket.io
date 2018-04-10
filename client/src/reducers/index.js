import { combineReducers } from 'redux';
import dishes from './reducer_dish'
import orders from './reducer_order'


export default combineReducers({
  dishes,
  orders
});
