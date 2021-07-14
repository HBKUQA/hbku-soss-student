import * as Types from './actionTypes'

const initialState = { user: null, loading: false }

const login = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USER_DATA:
      state = { ...state, loading: true }
      break
    case Types.SET_USER_DATA:
      state = { ...state, user: action?.payload?.user, loggingIn: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default login
