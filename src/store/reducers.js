import { combineReducers } from 'redux'
import Login from './auth/reducer'

const rootReducer = combineReducers({
  Login,
})

export default rootReducer
