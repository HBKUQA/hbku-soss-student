import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function useIsTop() {
  const [isTop, setIsTop] = useState(true)
  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll < 500) setIsTop(true)
    else setIsTop(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  return [isTop, setIsTop]
}

function NavBar() {
  const [fixed] = useIsTop()
  return (
    <header className={fixed ? '' : 'is-fixed'}>
      <div className='container'>
        <div className='header-container'>
          <div className='header-logo'>
            <Link className='title' title='Virtual Student Orientation' to='/'>
              Virtual Student Orientation
            </Link>
            <span className='subtitle'>Testing Version</span>
          </div>
          <Link className='btn btn-header' to='/login'>
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
export default NavBar
