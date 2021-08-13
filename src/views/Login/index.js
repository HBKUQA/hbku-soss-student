import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getUserData } from '../../store/user/actions'

function Login() {
  // const [logout, setLogout] = useState(false)
  const dispatch = useDispatch()
  const search = useLocation().search
  const token = new URLSearchParams(search).get('token')

  useEffect(() => {
    axios.defaults.headers['api-key'] = token
    dispatch(getUserData())
  }, [dispatch, token])

  return (
    <div>
      <h1>{token}</h1>
      <a href='https://orientationapi.hbku.edu.qa/saml_login'>Login</a>

      {/* <button onClick={() => setLogout(!logout)}></button> */}
      <a href='https://orientationapi.hbku.edu.qa/user/logout'>Logout</a>
    </div>
  )
}

export default Login

// import { useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
// import { loginUser } from '../../store/auth/actions'

// function LoginForm() {
//   const passwordRef = useRef()
//   const [passwordIsShown, setPasswordIsShown] = useState(false)

//   const { loggingIn, error } = useSelector(state => ({
//     loggingIn: state.Login.loggingIn,
//     error: state.Login.error,
//   }))

//

//   const { register, handleSubmit } = useForm()

//   const onSubmit = data => {
//     (loginUser(data))
//   }

//   if (loggingIn)
//     return (
//       <div className='auth-form'>
//         <div className='auth-form-loading'>
//           <form onSubmit={event => event.preventDefault()}>
//             <h1>Logging in</h1>
//             <i className=' fas fa-spinner fa-spin fa-2x'></i>
//           </form>
//         </div>
//       </div>
//     )
//   return (
//     <div className='auth-form'>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h1>Log in</h1>
//         <h3>
//           with your <strong>HBKU address</strong>
//         </h3>
//         {error ? <div className='alert'>{error}</div> : <></>}
//         <input type='text' {...register('email', { required: true })} placeholder='Your email*' />
//         <button type='submit'>LOG IN</button>
//       </form>
//     </div>
//   )
// }
// export default LoginForm
