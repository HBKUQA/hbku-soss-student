import headerVideo from '../../assets/videos/header.mp4'
import Hayakom from './Hayakom'
import hasnah from '../../assets/images/Dr-hasnha.jpg'
import benedik from '../../assets/images/Pro.jpg'
import avatar from '../../assets/images/woman-icon-picture-profile-female-icon-human-people-sign-symbol-woman-icon-picture-profile-female-icon-human-123361956.jpeg'
import maryam from '../../assets/images/maryam_portrait.jpeg'
import NavBar from './NavBar'
import Orientation from './Orientation'
import CarouselSpeakers, { CarouselItem, Professors } from './CarouselSpeakers'
// import { BASE_URL } from '../../params'

function Hero() {
  return <video className='hero' autoPlay muted loop src={headerVideo}></video>
}

function PreviousOrientations(props) {
  return <section></section>
}

function Landing() {
  return (
    <main id='home'>
      <NavBar />
      <Hero />
      <Hayakom />
      <Orientation />
      <CarouselSpeakers>
        <CarouselItem
          name='Dr.Ahmed<br />M. Hasnah'
          show
          post='president'
          description='Since he joined QF in 2002, Dr. Hasnah has been a key player in the development of Education City– a unique hub for knowledge and education through partnerships with world-class educational and research institutions.'
          image={hasnah}
        />
        <CarouselItem
          name='Dr.Michael<br />J. Benedik'
          post='provost'
          description='Dr. Benedik brings a wealth of over 30 years’ academic leadership experience to HBKU. Most recently, he has held the roles of Vice Provost and Chief International Officer for Texas A&M University, where he served as an advisor to the Provost and President, providing guidance for campus-wide initiatives in concert with university and college leadership.'
          image={benedik}
        />
      </CarouselSpeakers>
      <Professors
        data={[
          { image: benedik, name: 'Dr. Michael J. Benedik', post: 'PROVOST, HBKU' },
          {
            image: maryam,
            name: 'Dr. Maryam Hamad Al-Mannai',
            post: 'VICE PRESIDENT OF STUDENT AFFAIRS',
          },
          { image: avatar, name: 'Dr. Nadir Yildirim', post: 'INNOVATION DIRECTOR' },
          { image: avatar, name: 'Arwa S. Sulieman', post: 'REGISTRAR SPECIALIST' },
        ]}
      />
      <section className='orientation-program'>
        <div className='container'>
          <h1>Previous Orientations</h1>
        </div>
      </section>
      <PreviousOrientations></PreviousOrientations>
    </main>
  )
}

export default Landing
