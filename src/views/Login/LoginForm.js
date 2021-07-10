import { useRef, useState } from 'react'

function LoginForm() {
  const passwordRef = useRef()
  const [passwordIsShown, setPasswordIsShown] = useState(false)

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

  return (
    <div className='auth-form'>
      <form onSubmit={event => event.preventDefault()}>
        <h1>Log in</h1>
        <h2>
          with your <strong>HBKU adress</strong>
        </h2>
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
      </form>
    </div>
  )
}
export default LoginForm

//<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//         <div className={classes.paper}>
//           <Typography component='h1' variant='h5'>
//

//
//           </Typography>
//           <form className={classes.form} noValidate>
//             <center>
//               <TextField
//                 variant='outlined'
//                 margin='normal'
//                 required
//                 style={{ width: '50%' }}
//                 id='email'
//                 label='Email Address'
//                 name='email'
//                 autoComplete='email'
//                 autoFocus
//               />
//             </center>
//             <center>
//               <TextField
//                 variant='outlined'
//                 margin='normal'
//                 required
//                 style={{ width: '50%' }}
//                 name='password'
//                 label='Password'
//                 type='password'
//                 id='password'
//                 autoComplete='current-password'
//               />
//             </center>
//             <center>
//               <FormControlLabel
//                 control={<Checkbox value='remember' color='primary' />}
//                 label='Remember me'
//                 style={{ width: '50%' }}
//               />
//             </center>

//             <center>
//               <Button
//                 type='submit'
//                 style={{ width: '30%' }}
//                 variant='contained'
//                 color='primary'
//                 className='p-3 mb-2 bg-primary text-blue'>
//                 LOG IN
//               </Button>
//             </center>

//             <Grid container>
//               <Grid item xs>
//                 <center>
//                   <Link href='#' variant='body2'>
//                     Forgot password?
//                   </Link>
//                 </center>
//               </Grid>
//             </Grid>
//             <Box mt={5}>
//               <Copyright />
//             </Box>
//           </form>
//         </div>
//       </Grid>
