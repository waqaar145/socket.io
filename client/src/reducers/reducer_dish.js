import {SET_SAVED_DISHES, SET_ALL_DISHES_NAMES, UPDATING_SAMPLE_REPORT} from './../types.js'

export default function dish (state = [], action = {}){
  switch(action.type){

    case SET_SAVED_DISHES:
      return [...state, action.data]

    case SET_ALL_DISHES_NAMES:
      return action.data

    case UPDATING_SAMPLE_REPORT:
    let newState =  state.map((state) => {
        if (state._id === action.data._id ){
          state.createdTillNow = action.data.createdTillNow
          return state;
        }
        return state;
      })
      return newState;

    default:
        return state;
  }
}
