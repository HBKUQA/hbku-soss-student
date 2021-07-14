import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import axios from 'axios'
import { BASE_URL } from '../../params'

function Chapter(props) {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [courses, setCourses] = useState([])
  const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()

  const { id, chapterId } = props?.match?.params

  useEffect(() => {
    axios
      .get(`/api/chapter/${chapterId}`)
      .then(res => setData(res.data[0]))
      .catch(() => setError(true))

    axios
      .get(`/api/program/${id}/chapters`)
      .then(res =>
        setCourses(
          res.data.map(e => ({
            id: e.nid,
            title: e.title,
            time: e.field_video_duration,
            done: false,
          }))
        )
      )
      .catch(err => null)
  }, [id, chapterId])

  const sections = data?.field_paragraphs_export ?? []

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
  if (error) return <></>
  return (
    <>
      <Header />
      <TopBar prefix={`Section ${data?.nid}`} title={data?.title} />
      <SideBar
        useRef={sideBarRef}
        toogler={toogler}
        items={courses}
        currentChapter={currentChapter}
      />
      <div className='vider-container'>
        <div className='container'>
          <div ref={videoRef}>
            <video src={BASE_URL + data?.field_video} controls></video>
          </div>
        </div>
      </div>
      <div className='container course-detail'>
        <div ref={documentRef}>
          {sections.map((e, k) => (
            <React.Fragment key={k}>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Chapter
