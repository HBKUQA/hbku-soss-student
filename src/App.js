import { Route, Redirect, Switch } from 'react-router-dom'
import AuthMiddleWare from './routes/middleware/AuthMiddleWare'
import Login from './views/Login'
import Courses from './views/Courses'
import Chapter from './views/Chapter'
import { disconnect, getUserData } from './store/user/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  // API_SECRET,
  BASE_URL,
} from './params'
import axios from 'axios'

function Logout() {
  axios.defaults.headers.common['api-key'] = undefined
  console.log('clearing from logout')
  localStorage.clear()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(disconnect())
    window.location.href = BASE_URL + '/user/logout'
  }, [dispatch])

  return <Redirect to='/' />
}

function HomePage() {
  window.location.reload(true)
  return <></>
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('api-token')
    if (token) {
      axios.defaults.headers.common['api-key'] = token
      dispatch(getUserData())
    } else {
      axios.defaults.headers.common['api-key'] = undefined
      dispatch(getUserData())
    }
  }, [dispatch])

  const refreshingToken = useSelector(state => state.Login.refreshingToken)
  const loggingIn = useSelector(state => state.User.loggingIn)

  if (refreshingToken || loggingIn) return <></>
  return (
    <Switch>
      <AuthMiddleWare
        path='/login'
        isAnonymousProtected
        component={Login}
        isAuthProtected={false}
        exact
      />
      <AuthMiddleWare path='/programs' component={Courses} isAuthProtected={true} exact />
      <AuthMiddleWare
        path='/program/:id/:chapterId'
        component={Chapter}
        isAuthProtected={true}
        exact
      />
      <AuthMiddleWare path='/' isAuthProtected={false} exact>
        <HomePage />
      </AuthMiddleWare>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route>
        <Redirect to='/login'></Redirect>
      </Route>
    </Switch>
  )
}

export default App
