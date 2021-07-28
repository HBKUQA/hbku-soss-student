import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Footer() {
  const user = useSelector(state => state.User.user)

  const links = [
    { text: 'About', link: '/about' },
    { text: 'Privacy policy', link: '/privacy-policy' },
    { text: 'Terms and condition', link: '/terms-and-condition' },
  ]
  return (
    <footer>
      <div className='container'>
        <a href='#top' className='btn-top'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
          </svg>
        </a>
        <ul>
          {links.map((e, k) => (
            <li key={k}>
              <Link to={e.link}>{e.text}</Link>
            </li>
          ))}

          {user === null && (
            <li>
              <Link to='/login'>Log in</Link>
            </li>
          )}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
