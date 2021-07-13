import * as Types from './actionTypes'

const initialState = { error: '', loading: false, tokenRefreshed: false }

const login = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_USER:
      state = { ...state, loading: true }
      break
    // case LOGIN_SUCCESS:
    //   state = { ...state, loading: false }
    //   break
    // case LOGOUT_USER:
    //   state = { ...state }
    //   break
    // case LOGOUT_USER_SUCCESS:
    //   state = { ...state }
    //   break
    // case API_ERROR:
    //   state = { ...state, error: action.payload, loading: false }
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
