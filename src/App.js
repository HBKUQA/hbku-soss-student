import { Route, Redirect, Switch } from 'react-router-dom'
import AuthMiddleWare from './routes/middleware/AuthMiddleWare'
import Login from './views/Login'
import ProgramIntro from './views/ProgramIntro'
function App() {
  // const login = () => console.log('qsd')

  return (
    <Switch>
      <AuthMiddleWare path='/login' component={Login} isAuthProtected={false} exact />
      {/* <Route path='/login'>
        <Login login={login} />
      </Route> */}
      <AuthMiddleWare path='/' component={ProgramIntro} isAuthProtected={false} exact />
      <Route>
        <Redirect to='/'></Redirect>
      </Route>
    </Switch>
  )
}

export default App
