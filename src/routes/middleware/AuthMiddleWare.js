import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
function Layout(props) {
  return <>{props.children}</>
}
function AuthMiddleWare({ path, component: Component, isAuthProtected, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !localStorage.getItem('authUser')) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        if (!isAuthProtected && localStorage.getItem('authUser')) {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

AuthMiddleWare.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}
export default AuthMiddleWare
