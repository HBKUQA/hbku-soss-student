import * as Types from './actionTypes'

export const loginUser = credential => ({ type: Types.LOGIN_USER, payload: { credential } })
export const loginSuccess = () => ({ type: Types.LOGIN_SUCCESS, payload: {} })
export const apiError = error => ({ type: Types.API_ERROR, payload: error })
export const refreshToken = blocker => ({ type: Types.REFRESH_TOKEN, payload: { blocker } })
export const refreshTokenSuccess = () => ({ type: Types.REFRESH_TOKEN_SUCCESS, payload: {} })
