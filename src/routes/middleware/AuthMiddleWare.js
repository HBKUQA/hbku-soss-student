import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Layout(props) {
  return <>{props.children}</>
}
function AuthMiddleWare({
  path,
  component: Component,
  isAuthProtected,
  isAnonymousProtected,
  ...rest
}) {
  const user = useSelector(state => state.User.user)

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && user === null) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        if (!isAuthProtected && isAnonymousProtected && user) {
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
