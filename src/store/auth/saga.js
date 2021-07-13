import {
  // call,
  //  put,
  takeEvery,
} from 'redux-saga/effects'

// // Login Redux States
import * as Types from './actionTypes'
// import {
//   apiError,
//   loginSuccess,
//   logoutUserSuccess,
//   refreshTokenSuccess,
// } from "./actions"

// import { axiosApi } from "../../../helpers/api_helper"

// const sendLogin = async data => {
//   return await axiosApi
//     .post("/oauth/token", data, {
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//     .then(response => response.data)
// }

// const sendLogout = async () => {
//   const jwt = localStorage.getItem("access_token")
//   return await axiosApi
//     .post("/user/logout", {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     })
//     .then(response => response.data)
// }

// function* refreshToken({ payload: { blocker } }) {
//   const refresh = localStorage.getItem("refresh_token")
//   if (!blocker) yield put(refreshTokenSuccess())
//   if (refresh) {
//     let data = new FormData()
//     data.append("grant_type", "refresh_token")
//     data.append("client_id", "8749af6a-176e-4095-9400-be63a5899fa8")
//     data.append("client_secret", "8749af6a-176e-4095-9400-be63a5899fa8")
//     data.append("refresh_token", refresh)

//     try {
//       const response = yield sendLogin(data)
//       localStorage.setItem("access_token", response.access_token)
//       localStorage.setItem("expires_in", response.expires_in)
//       localStorage.setItem("refresh_token", response.refresh_token)
//       localStorage.setItem("token_type", response.token_type)
//       if (blocker) yield put(refreshTokenSuccess())
//     } catch (error) {
//       localStorage.clear()
//       if (blocker) yield put(refreshTokenSuccess())
//       const errorMessage = error?.response?.data?.error_description
//       yield put(apiError(errorMessage ?? "Cannot connect to server"))
//     }
//   } else {
//     if (blocker) yield put(refreshTokenSuccess())
//   }
// }

function* loginUser({ payload: { user, history } }) {
  //   let data = new FormData()
  //   data.append("grant_type", "password")
  //   data.append("client_id", "8749af6a-176e-4095-9400-be63a5899fa8")
  //   data.append("client_secret", "8749af6a-176e-4095-9400-be63a5899fa8")
  //   data.append("username", user.email)
  //   data.append("password", user.password)
  //   try {
  //     const response = yield sendLogin(data)
  //     localStorage.setItem("access_token", response.access_token)
  //     localStorage.setItem("expires_in", response.expires_in)
  //     localStorage.setItem("refresh_token", response.refresh_token)
  //     localStorage.setItem("token_type", response.token_type)
  //     yield put(loginSuccess(response))
  //     history.push("/dashboard")
  //   } catch (error) {
  //     console.log(error)
  //     const errorMessage = error?.response?.data?.error_description
  //     yield put(apiError(errorMessage ?? "Cannot connect to server"))
  //   }
}

// function* logoutUser({ payload: { history } }) {
//   try {
//     const response = yield sendLogout()
//     console.log(response)
//     localStorage.clear()
//     yield put(logoutUserSuccess(response))
//     history.push("/login")
//   } catch (error) {
//     history.push("/login")
//   }
// }

function* authSaga() {
  yield takeEvery(Types.LOGIN_USER, loginUser)
  //   yield takeEvery(LOGOUT_USER, logoutUser)
  //   yield takeEvery(REFRESH_TOKEN, refreshToken)
}

export default authSaga
