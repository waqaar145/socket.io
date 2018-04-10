import {SET_SAVED_DISHES, SET_ALL_DISHES_NAMES} from './../types'
import api from './../api/api_dish'

export function setSavedDishes (data) {
  return {
    type: SET_SAVED_DISHES,
    data
  }
}

export function setAllDishesNames (data) {
  return {
    type: SET_ALL_DISHES_NAMES,
    data
  }
}
// Get job detail
export const saveDish = (dish) => dispatch => {
  return api.dish.saveDishApi(dish).then(data => {
    return dispatch(setSavedDishes(data))
  })
}

// get dish names
export const getDishNames = () => dispatch => {
  return api.dish.getDishNamesApi().then(data => {
    return dispatch(setAllDishesNames(data))
  })
}
