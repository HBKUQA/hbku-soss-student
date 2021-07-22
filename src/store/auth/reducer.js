import * as Types from './actionTypes'

const initialState = { error: '', loggingIn: false, refreshingToken: true }

const login = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      state = { ...state, loggingIn: true }
      break
    case Types.LOGIN_SUCCESS:
      state = { ...state, loggingIn: false }
      break
    case Types.API_ERROR:
      state = { ...state, error: action.payload, loggingIn: false }
      break
    case Types.REFRESH_TOKEN:
      state = { ...state, refreshingToken: true }
      break
    case Types.REFRESH_TOKEN_SUCCESS:
      state = { ...state, refreshingToken: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
