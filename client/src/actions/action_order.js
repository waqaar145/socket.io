import {SET_NEW_ORDER_IN_KITCHEN, SET_ORDERS_IN_KITCHEN, UPDATE_ORDERS_IN_KITCHEN, UPDATING_SAMPLE_REPORT} from './../types'
import api from './../api/api_order'


export function setNewOrderInKitchen(data) {
  return {
    type: SET_NEW_ORDER_IN_KITCHEN,
    data
  }
}

export function setOrdersInKitchen(data) {
  return {
    type: SET_ORDERS_IN_KITCHEN,
    data
  }
}

export function updateOrderInKitchen(data) {
  return {
    type: UPDATE_ORDERS_IN_KITCHEN,
    data
  }
}

export function updatingSampleReport (data) {
  return {
    type: UPDATING_SAMPLE_REPORT,
    data
  }
}


// Ordering food
export const orderNow = (data) => dispatch => {
  return api.order.orderNowApi(data).then(data => {
    return dispatch(setNewOrderInKitchen(data))
  })
}

// get all the orders
export const getAllOrders = () => dispatch => {
  return api.order.getAllOrdersApi().then(data => {
    return dispatch(setOrdersInKitchen(data))
  })
}

// done preparing dish
export const donePreparingDish = (id) => dispatch => {
  return api.order.donePreparingDishApi(id).then(data => {
    return dispatch(updateOrderInKitchen(data))
  })
}

export const AddNewOrderToEveryKT = (data) => dispatch => {
  return dispatch(setNewOrderInKitchen(data))
}

export const RemoveOrder = data => dispatch => {
  return dispatch(updateOrderInKitchen(data))
}

export const UpdaetSampleReport = (data) => dispatch => {
  return dispatch(updatingSampleReport(data))
}
