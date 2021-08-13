import { put, takeEvery } from 'redux-saga/effects'

import * as Types from './actionTypes'
import { setUserData } from './actions'
import { refreshTokenSuccess } from '../auth/actions'
import axios from 'axios'

const getConnectedUser = async () =>
  await axios.get('/api/current-user', { withCredentials: true }).then(res => res.data?.[0])

function* getUserData() {
  try {
    const user = yield getConnectedUser()
    yield put(setUserData(user))
    yield put(refreshTokenSuccess())
  } catch (error) {
    yield put(setUserData(null))
    yield put(refreshTokenSuccess())
  }
}

function* userSaga() {
  yield takeEvery(Types.GET_USER_DATA, getUserData)
}

export default userSaga
