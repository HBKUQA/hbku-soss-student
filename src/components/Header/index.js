import { Link } from 'react-router-dom'
import logo from '../../assets/svg/logo_text_color.svg'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../params'

const UserIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='18.285' height='16' viewBox='0 0 18.285 16'>
    <path
      d='M92.951,3.81A3.81,3.81,0,1,1,89.142,0,3.809,3.809,0,0,1,92.951,3.81Zm0,0'
      transform='translate(-82.284)'
    />
    <path
      d='M10.1,256H3.619A3.623,3.623,0,0,0,0,259.619v2.667a.572.572,0,0,0,.571.571H13.143a.572.572,0,0,0,.571-.571v-2.667A3.623,3.623,0,0,0,10.1,256Zm0,0'
      transform='translate(0 -246.857)'
    />
    <path
      d='M306.1,109.315l-2.667-2.476a.573.573,0,0,0-.961.419v1.714H299.43a.762.762,0,0,0,0,1.524h3.047v1.714a.572.572,0,0,0,.961.419l2.667-2.476a.573.573,0,0,0,0-.838Zm0,0'
      transform='translate(-288.001 -102.877)'
    />
  </svg>
)

function UserAvatar(props) {
  return (
    <div className='userAvatar'>
      <div className='userAvatar-toogler'>
        <img src={BASE_URL + props.user_picture} alt={props.field_full_name} />
        <span className='userAvatar-name'>Welcome, {props.field_full_name}</span>
      </div>
      <div className='userAvatar-menue'>
        <a href='/'>Home Page</a>
        <Link to='/programs'>My Orientation program</Link>
        <Link to='/logout'>Logout</Link>
      </div>
    </div>
  )
}

function AuthPanel() {
  const user = useSelector(state => state.User.user)
  if (user) return <UserAvatar {...user} />
  return (
    <Link to='/login' className='btn btn-outline-dark'>
      <UserIcon />
      <span className='ms-2'>Log in</span>
    </Link>
  )
}

function Header() {
  return (
    <header>
      <div className='container'>
        <Link to='/home'>
          <img src={logo} alt='logo' className='logo' />
        </Link>
        <div className='actions'>
          {/* <div className='input-group outline-primary'>
            <span className='input-group-icon'>
              <i className='fas fa-search'></i>
            </span>
            <input type='search' placeholder='Search for orientation materials ...' />
          </div>
          <div className='btn px-0'>
            <i className='fas fa-bell notif active'></i>
          </div> */}
          <AuthPanel />
        </div>
      </div>
    </header>
  )
}
export default Header
