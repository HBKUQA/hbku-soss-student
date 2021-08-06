import orientationImg from '../../assets/images/main-image.jpg'
import bgImage from '../../assets/images/background-gray-dots.svg'
function Orientation() {
  return (
    <section className='orientation-program'>
      <img src={bgImage} alt='bg' className='bg-image'></img>
      <div className='container'>
        <h1>Orientation Program</h1>
        <div className='orientation-card'>
          <div className='date'>15 TH OF AUGUST 2021</div>
          <div className='text-container'>
            <h2>We have developed 8 chapters which will help you learn more</h2>
            <p>
              Start with chapter one to unlock the following chapters. Once you have completed all
              chapters, you will be able to register for the advising session that corresponds with
              your program. Make sure to register with your HBKU email.
            </p>
          </div>
          <div className='image-container'>
            <img src={orientationImg} alt='orientation' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Orientation
