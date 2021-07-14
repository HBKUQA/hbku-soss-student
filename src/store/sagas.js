import { all, fork } from 'redux-saga/effects'

import AuthSaga from './auth/saga'
import UserSaga from './user/saga'

export default function* rootSaga() {
  yield all([fork(AuthSaga)])
  yield all([fork(UserSaga)])
}
