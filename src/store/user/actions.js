import * as Types from './actionTypes'

export const getUserData = () => ({ type: Types.GET_USER_DATA, payload: {} })
export const setUserData = user => ({ type: Types.SET_USER_DATA, payload: { user } })
export const disconnect = () => ({ type: Types.CLEAR_USER_DATA, payload: {} })
