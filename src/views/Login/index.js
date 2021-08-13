import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getUserData } from '../../store/user/actions'

function Login() {
  const dispatch = useDispatch()
  const search = useLocation().search
  const token = new URLSearchParams(search).get('token')

  if (token) {
    localStorage.setItem('api-token', token)
  } else {
    window.location.href = '/'
  }

  useEffect(() => {
    axios.defaults.headers.common['api-key'] = token
    dispatch(getUserData())
  }, [dispatch, token])

  return (
    <div className='auth loading'>
      <div className='auth-form'>
        <div className='auth-form-loading'>
          <h1>Logging in</h1>
          <i className=' fas fa-spinner fa-spin fa-2x'></i>
        </div>
      </div>
    </div>
  )
}

export default Login
