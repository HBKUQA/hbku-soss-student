import * as Types from './actionTypes'

export const getUserData = () => {
  return { type: Types.GET_USER_DATA, payload: {} }
}
export const setUserData = user => {
  return { type: Types.SET_USER_DATA, payload: { user } }
}
