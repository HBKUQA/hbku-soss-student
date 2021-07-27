import { Route, Redirect, Switch } from 'react-router-dom'
import AuthMiddleWare from './routes/middleware/AuthMiddleWare'
import Login from './views/Login'
import ProgramIntro from './views/ProgramIntro'
import Courses from './views/Courses'
import Chapter from './views/Chapter'
import Landing from './views/Landing'
import { refreshToken } from './store/auth/actions'
import { disconnect } from './store/user/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_SECRET } from './params'
import axios from 'axios'

const refreshTokenWithoutRedux = () => {
  const token = localStorage.getItem('refresh_token')
  let data = new FormData()
  data.append('grant_type', 'refresh_token')
  data.append('client_id', API_SECRET)
  data.append('client_secret', API_SECRET)
  data.append('refresh_token', token)
  console.log('refreshTokenWithoutRedux')
  if (token) {
    axios
      .post('/oauth/token', data)
      .then(res => {
        console.log(res.data)
        const token = res.data
        localStorage.setItem('access_token', token.access_token)
        localStorage.setItem('expires_in', token.expires_in)
        localStorage.setItem('refresh_token', token.refresh_token)
        localStorage.setItem('token_type', token.token_type)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token
      })
      .catch(err => {
        console.log(err)
      })
  }
}

function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(disconnect())
  }, [dispatch])

  return <Redirect to='/' />
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken(true))
  }, [dispatch])

  useEffect(() => {
    const timer = setInterval(refreshTokenWithoutRedux, 150000)
    return () => {
      clearInterval(timer)
    }
  }, [])

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
      <AuthMiddleWare path='/program/:id' component={ProgramIntro} isAuthProtected={true} exact />
      <AuthMiddleWare
        path='/program/:id/:chapterId'
        component={Chapter}
        isAuthProtected={true}
        exact
      />
      <AuthMiddleWare path='/' component={Landing} isAuthProtected={false} exact />
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route>
        <Redirect to='/'></Redirect>
      </Route>
    </Switch>
  )
}

export default App
