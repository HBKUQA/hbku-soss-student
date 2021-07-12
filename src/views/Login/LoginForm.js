import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
function LoginForm(props) {
  const passwordRef = useRef()
  const [passwordIsShown, setPasswordIsShown] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const sendData = event => {
    event.preventDefault()
    setLoading(true)
    setTimeout(props.login, 2000)
  }

  if (loading)
    return (
      <div className='auth-form'>
        <div className='auth-form-loading'>
          <form onSubmit={sendData}>
            <h1>Logging in</h1>
            <i className=' fas fa-spinner fa-spin fa-2x'></i>
          </form>
        </div>
      </div>
    )

  return (
    <div className='auth-form'>
      <form onSubmit={sendData}>
        <h1>Log in</h1>
        <h3>
          with your <strong>HBKU adress</strong>
        </h3>
        <input type='email' placeholder='Your email*' />
        <div className='input-actions'>
          <input type='password' ref={passwordRef} placeholder='Password*' />
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
