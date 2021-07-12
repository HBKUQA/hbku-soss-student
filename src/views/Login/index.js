import Carousel from './Carousel'
import LoginForm from './LoginForm'

import image1 from '../../assets/images/hbku-bg-1.png'
import image2 from '../../assets/images/hbku-bg-2.jpg'
import image3 from '../../assets/images/hbku-bg-3.jpg'

function Login(props) {
  const carouselData = [image1, image2, image3]
  document.title = 'HBKU SOOS - Login'
  return (
    <main className='auth'>
      <Carousel items={carouselData} />
      <LoginForm login={props.login} />
    </main>
  )
}

export default Login
