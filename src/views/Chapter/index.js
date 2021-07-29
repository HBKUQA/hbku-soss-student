import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import axios from 'axios'
import CoursVideo from './CoursVideo'
import Review from './Review'
import { useSelector } from 'react-redux'
import {professorData} from "../Landing/data";
import Professor from "../Landing/Professor";

function Chapter(props) {
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [courses, setCourses] = useState([])
  const [progress, setProgress] = useState(0)
  const [progressID, setProgressID] = useState(null)
  const [showReview, setShowReview] = useState(false)
  const [hasReview, setHasReview] = useState(false)
  const [review, setReview] = useState(0)
  const [attachements, setAttachements] = useState([])
  const [loadingAttachements, setLoadingAttachements] = useState(true)
  const [loading, setLoading] = useState(true)


    const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()
  const userID = useSelector(state => state.User?.user?.uid)
  const { id, chapterId } = props?.match?.params
  const refreshReview = data => {
    setHasReview(true)
    setReview(data.field_review[0].value)
  }

  useEffect(() => {
      setLoading(true)
      setData({})
      setAttachements([])
      setError(false)
      setLoadingAttachements(true)
    axios
      .get(`/api/chapter/${chapterId}`)
      .then(res => setData(res.data[0]))
      .catch(() => setError(true))
  }, [chapterId])

  useEffect(() => {
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
      .catch(() => null)

    axios
      .get(`/api/student/program/${id}/progress`)
      .then(res => {
        setProgress(res.data[0].field_process ?? 0)
        setProgressID(res.data[0].nid)
      })
      .catch(() => {
        axios
          .post('/node?_format=json', {
            type: 'student_progress',
            title: [{ value: `student progess ${id}-${userID}` }],
            field_program: [{ target_id: id }],
            field_process: [{ value: 0 }],
          })
          .then(newProgress => newProgress.data)
          .then(newProgress => {
            setProgress(0)
            setProgressID(newProgress.nid[0].value)
          })
      })
      axios
          .get(`/api/program/${id}/attachments`)
          .then(res => {
              setAttachements(res.data)
              setLoadingAttachements(false)
          })
          .catch(() => {
              setAttachements([])
              setLoadingAttachements(false)
          })
    axios
      .get(`/api/student/${id}/review`)
      .then(res => {
        if (res.data?.[0]) {
          setHasReview(true)
          setReview(res.data?.[0].field_review)
        }
      })
      .catch(() => {})
  }, [id, userID])

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

  const isLast = courses[courses.length - 1]?.id === chapterId

  const numberOfChapters = courses.length === 0 ? 1 : courses.length
  const chapterProgress = 1 / numberOfChapters
  const thisIndex = courses.findIndex(e => e.id === chapterId)
  const nextProgress = chapterProgress * (thisIndex + 1)

  const videoData = {
    videoRef: videoRef,
    end: () => {
      if (isLast) {
        setShowReview(true)
        axios
          .patch(`/node/${progressID}`, {
            type: 'student_progress',
            field_process: [{ value: 100 }],
          })
          .then(() => {
            setProgress(100)
          })
          .catch(() => null)
      } else {
        axios
          .patch(`/node/${progressID}`, {
            type: 'student_progress',
            field_process: [{ value: nextProgress * 100 }],
          })
          .then(() => {
            setProgress(nextProgress * 100)
          })
          .catch(() => null)
      }
    },
    field_video: data?.field_video,
  }

  if (error) return <></>

  const sectionNumber = courses.findIndex(e => e.id === data?.nid) + 1

  document.title = `${data?.title} - HBKU-SOOS`
  return (
    <>
      <Header />
      <Review
        refreshReview={refreshReview}
        programId={id}
        review={review}
        add={isLast}
        hasReview={hasReview}
        show={showReview}
      />
      <TopBar prefix={`Section ${sectionNumber}`} title={data?.title} />
      <SideBar
        progress={progress}
        useRef={sideBarRef}
        toogler={toogler}
        programId={id}
        items={courses}
        currentChapter={currentChapter}
      />
      <CoursVideo {...videoData} />

      <div className='container course-detail'>
        <div ref={documentRef}>
          {sections.map((e, k) => (
            <React.Fragment key={k}>
              <h2>{e.title}</h2>
              <p>{e.description}</p>
            </React.Fragment>
          ))}
        </div>
          <Professor {...professorData} />
      </div>
      <Footer />
    </>
  )
}
export default Chapter
