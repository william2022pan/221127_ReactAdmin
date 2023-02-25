// import { combineReducers } from 'redux'
import { combineReducers } from '../lib/redux'
import { INCREMENT, DECREMENT } from './action-types'

function count(state=2, action) {
  console.log('count()', state, action);
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default: 
      return state
  }

}


function user(state = {}, action) {
  console.log('user()', state, action);
  switch (action.type) {
    
    default:
      return state
  }
}


export default  combineReducers({
  count,
  user
})