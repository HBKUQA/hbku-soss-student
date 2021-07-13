import * as Types from './actionTypes'

const initialState = { user: null }

const login = (state = initialState, action) => {
  switch (action.type) {
    // case Types.LOGIN_USER:
    //   state = { ...state, loggingIn: true }
    //   break
    // case Types.LOGIN_SUCCESS:
    //   state = { ...state, loggingIn: false }
    //   break
    // case LOGOUT_USER:
    //   state = { ...state }
    //   break
    // case LOGOUT_USER_SUCCESS:
    //   state = { ...state }
    //   break
    // case Types.API_ERROR:
    //   state = { ...state, error: action.payload, loggingIn: false }
    //   break
    // case REFRESH_TOKEN:
    //   state = { ...state, tokenRefreshed: true }
    //   break
    // case REFRESH_TOKEN_SUCCESS:
    //   state = { ...state, tokenRefreshed: false }
    //   break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
