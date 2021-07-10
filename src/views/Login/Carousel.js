import image1 from '../../assets/images/hbku-bg-1.png'
import image2 from '../../assets/images/hbku-bg-2.jpg'
import image3 from '../../assets/images/hbku-bg-3.jpg'
import logo from '../../assets/svg/logo_text_color.svg'

function Carousel() {
  return (
    <div className='auth-carousel-container'>
      <img src={logo} alt='hbku-log' className='logo' />
      <div className='auth-carousel'>
        <img src={image1} alt='' />
      </div>
    </div>
  )
}
export default Carousel
