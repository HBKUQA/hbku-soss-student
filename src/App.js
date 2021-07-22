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

  const refreshingToken = useSelector(state => state.Login.refreshingToken)

  if (refreshingToken) return <></>
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
