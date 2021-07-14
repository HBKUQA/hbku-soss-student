import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { API_SECRET } from '../../params'
import * as Types from './actionTypes'
import { apiError, refreshTokenSuccess } from './actions'

import { getUserData } from '../user/actions'

const sendLogin = async credits => await axios.post('/oauth/token', credits).then(res => res.data)

function* loginUser({ payload: { credential } }) {
  let data = new FormData()
  data.append('grant_type', 'password')
  data.append('client_id', API_SECRET)
  data.append('client_secret', API_SECRET)
  data.append('username', credential.email)
  data.append('password', credential.password)
  try {
    const res = yield sendLogin(data)
    localStorage.setItem('access_token', res.access_token)
    localStorage.setItem('expires_in', res.expires_in)
    localStorage.setItem('refresh_token', res.refresh_token)
    localStorage.setItem('token_type', res.token_type)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token
    yield put(getUserData())
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    yield put(apiError(errorMessage ?? 'Cannot connect to server'))
  }
}

function* refreshToken({ payload: { blocker } }) {
  const token = localStorage.getItem('refresh_token')
  let data = new FormData()
  data.append('grant_type', 'refresh_token')
  data.append('client_id', API_SECRET)
  data.append('client_secret', API_SECRET)
  data.append('refresh_token', token)
  try {
    const res = yield sendLogin(data)
    localStorage.setItem('access_token', res.access_token)
    localStorage.setItem('expires_in', res.expires_in)
    localStorage.setItem('refresh_token', res.refresh_token)
    localStorage.setItem('token_type', res.token_type)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token
    yield put(getUserData())
    yield put(refreshTokenSuccess())
  } catch (error) {
    localStorage.clear()
    yield put(refreshTokenSuccess())
  }
}

function* authSaga() {
  yield takeEvery(Types.LOGIN_USER, loginUser)
  yield takeEvery(Types.REFRESH_TOKEN, refreshToken)
}

export default authSaga
