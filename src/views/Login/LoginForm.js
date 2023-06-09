import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../store/auth/actions'

function LoginForm() {
  const passwordRef = useRef()
  const [passwordIsShown, setPasswordIsShown] = useState(false)

  const { loggingIn, error } = useSelector(state => ({
    loggingIn: state.Login.loggingIn,
    error: state.Login.error,
  }))

  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    dispatch(loginUser(data))
  }

  const showPassword = () => {
    if (!passwordRef) return
    if (!passwordRef.current) return
    if (!passwordRef.current.type) return
    if (passwordRef.current.type === 'password') {
      passwordRef.current.type = 'text'
      setPasswordIsShown(true)
    } else {
      passwordRef.current.type = 'password'
      setPasswordIsShown(false)
    }
  }

  if (loggingIn)
    return (
      <div className='auth-form'>
        <div className='auth-form-loading'>
          <form onSubmit={event => event.preventDefault()}>
            <h1>Logging in</h1>
            <i className=' fas fa-spinner fa-spin fa-2x'></i>
          </form>
        </div>
      </div>
    )
  return (
    <div className='auth-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in</h1>
        <h3>
          with your <strong>HBKU address</strong>
        </h3>
        {error ? <div className='alert'>{error}</div> : <></>}
        <input type='text' {...register('email', { required: true })} placeholder='Your email*' />
        <div className='input-actions'>
          <input
            type='password'
            {...register('password', { required: true })}
            ref={passwordRef}
            placeholder='Password*'
          />
          <button type='button' onClick={showPassword}>
            {passwordIsShown ? (
              <i className='fas fa-eye-slash'></i>
            ) : (
              <i className='fas fa-eye'></i>
            )}
          </button>
        </div>
        <button type='submit'>LOG IN</button>
        <Link to='/'>
          <i className='fas fa-long-arrow-alt-left me-2'></i>
          Back to home page
        </Link>
      </form>
    </div>
  )
}
export default LoginForm
