import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React, { useEffect, useRef } from 'react'
import TopBar from './TopBar'
import videoUrl from '../../assets/videos/welcome.mp4'
import SideBar from './SideBar'

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel finibus molestie, ante augue scelerisque lectus, nec tempor risus ligula non augue. In diam nulla, iaculis ut commodo nec, congue at purus. Sed sagittis pharetra nisi semper volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel finibus molestie, ante augue scelerisque lectus, nec tempor risus ligula non augue. In diam nulla, iaculis ut commodo nec, congue at purus. Sed sagittis pharetra nisi semper volutpat.'
function Chapter(props) {
  const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()

  const courseSections = [
    { id: '1', title: 'Welcome Note by HBKU Leadership', time: 675, done: true },
    { id: '2', title: 'What you should known about HBKU', time: 1211, done: true },
    { id: '3', title: 'The Student Services at HBKU', time: 1211, done: false },
    { id: '4', title: 'How to engage in student life ?', time: 1211, done: false },
    { id: '5', title: 'Research activities at HBKU', time: 1211, done: false },
    { id: '6', title: 'Next steps', time: 1211, done: false },
  ]
  const sections = [
    { title: 'Note', text },
    { title: 'Lorem ipsum', text },
    { title: 'Lorem ipsum', text },
  ]
  const toogler = () => {
    const sidebarDOM = sideBarRef?.current
    const videoDOM = videoRef?.current
    const documentDOM = documentRef?.current

    const status = sidebarDOM?.className === 'toogled'
    if (sidebarDOM) sidebarDOM.className = status ? '' : 'toogled'
    if (videoDOM) videoDOM.className = status ? '' : ' toogled'
    if (documentDOM) documentDOM.className = status ? '' : ' toogled'
    updatePosition()
  }

  const updatePosition = () => {
    const sidebarDOM = sideBarRef?.current
    const videoDOM = videoRef?.current
    const status = sidebarDOM?.className === 'toogled'

    const box = videoDOM?.getClientRects()?.[0]
    const sideBarStart = box?.x + box?.width
    if (window.innerWidth > 768) {
      if (sidebarDOM) sidebarDOM.style.left = status ? `${sideBarStart}px` : '150vw'
    } else {
      if (sidebarDOM) sidebarDOM.style.left = status ? `0px` : '100vw'
    }
  }

  const currentChapter = props?.match?.params?.chapterId

  useEffect(() => {
    window.addEventListener('resize', () => {
      updatePosition()
    })
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])
  return (
    <>
      <Header />
      <TopBar prefix='Section 2' title='The University Technology Services for Students' />
      <SideBar
        useRef={sideBarRef}
        toogler={toogler}
        items={courseSections}
        currentChapter={currentChapter}
      />
      <div className='vider-container'>
        <div className='container'>
          <div ref={videoRef}>
            <video controls>
              <source src={videoUrl} />
            </video>
          </div>
        </div>
      </div>
      <div className='container course-detail'>
        <div ref={documentRef}>
          {sections.map((e, k) => (
            <React.Fragment key={k}>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Chapter
