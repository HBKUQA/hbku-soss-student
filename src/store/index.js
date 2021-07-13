import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// function reducer(state = { num: 0 }, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         ...state,
//         num: state.num + action.step,
//       }
//     case 'DECREMENT':
//       return {
//         ...state,
//         num: state.num - action.step,
//       }
//     default:
//       return state
//   }
// }

// export default reducer

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store
