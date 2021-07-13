import { Route, Redirect, Switch } from 'react-router-dom'
import AuthMiddleWare from './routes/middleware/AuthMiddleWare'
import Login from './views/Login'
import ProgramIntro from './views/ProgramIntro'
import Courses from './views/Courses'
import Chapter from './views/Chapter'
import LandingPage from './views/LandingPage'

function App() {
  // const login = () => console.log('qsd')

  return (
    <Switch>
      <AuthMiddleWare path='/login' component={Login} isAuthProtected={false} exact />
      <AuthMiddleWare path='/programs' component={Courses} isAuthProtected={false} exact />
      <AuthMiddleWare path='/program/:id' component={ProgramIntro} isAuthProtected={false} exact />
      <AuthMiddleWare
        path='/program/:id/:chapterId'
        component={Chapter}
        isAuthProtected={false}
        exact
      />
      <AuthMiddleWare path='/' component={LandingPage} isAuthProtected={false} exact />
      <Route>
        <Redirect to='/'></Redirect>
      </Route>
    </Switch>
  )
}

// /program/id/chapter_id

export default App
