import { put, takeEvery } from 'redux-saga/effects'

import * as Types from './actionTypes'
import { setUserData } from './actions'
import axios from 'axios'

const getConnectedUser = async () => await axios.get('/api/current-user').then(res => res.data?.[0])

function* getUserData() {
  try {
    const user = yield getConnectedUser()
    yield put(setUserData(user))
  } catch (error) {
    yield put(setUserData(null))
  }
}

function* userSaga() {
  yield takeEvery(Types.GET_USER_DATA, getUserData)
}

export default userSaga
