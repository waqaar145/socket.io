import {SET_NEW_ORDER_IN_KITCHEN, SET_ORDERS_IN_KITCHEN, UPDATE_ORDERS_IN_KITCHEN} from './../types.js'

export default function dish (state = [], action = {}){
  switch(action.type){

    case SET_NEW_ORDER_IN_KITCHEN:
      return [...state, ...action.data]

    case SET_ORDERS_IN_KITCHEN:
      return action.data

    case UPDATE_ORDERS_IN_KITCHEN:

      state.map((state) => {
        if (state.dishId === action.data.dish._id) {
          state.dish_detail[0].createdTillNow = action.data.dish.createdTillNow
        }
      })

      return state.filter(order => order._id !== action.data.order._id)

    default:
        return state;
  }
}
