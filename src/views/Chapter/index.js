import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React from 'react'
import TopBar from './TopBar'

import videoUrl from '../../assets/videos/welcome.mp4'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel finibus molestie, ante augue scelerisque lectus, nec tempor risus ligula non augue. In diam nulla, iaculis ut commodo nec, congue at purus. Sed sagittis pharetra nisi semper volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel finibus molestie, ante augue scelerisque lectus, nec tempor risus ligula non augue. In diam nulla, iaculis ut commodo nec, congue at purus. Sed sagittis pharetra nisi semper volutpat.'
function Chapter(props) {
  const sections = [
    { title: 'Note', text },
    { title: 'Lorem ipsum', text },
    { title: 'Lorem ipsum', text },
  ]
  return (
    <>
      <Header />
      <TopBar prefix='Section 2' title='The University Technology Services for Students' />
      <div className='vider-container'>
        <div className='container'>
          <video controls>
            <source src={videoUrl} />
          </video>
        </div>
      </div>
      <div className='container course-detail'>
        {sections.map((e, k) => (
          <React.Fragment key={k}>
            <h2>{e.title}</h2>
            <p>{e.text}</p>
          </React.Fragment>
        ))}
      </div>
      <Footer />
    </>
  )
}
export default Chapter
