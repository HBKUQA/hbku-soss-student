import Header from '../../components/Header'
import Footer from '../../components/Footer'
import React, { useEffect, useRef, useState } from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import axios from 'axios'
import CoursVideo from './CoursVideo'
import Review from './Review'
import { useSelector } from 'react-redux'
import { professorData } from '../Landing/data'
import Professor from '../Landing/Professor'
import { LAST_PROGRAM_ID } from '../../params'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

import { ReactComponent as ChapterIcon } from '../../assets/svg/chapter.svg'
import { ReactComponent as ListIcon } from '../../assets/svg/bullet-list-marked.svg'

function Chapter(props) {
  const [data, setData] = useState({})
  const [program, setProgram] = useState({})
  // const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [courses, setCourses] = useState([])
  const [loadingcourses, setLoadingCourses] = useState(true)
  const [progress, setProgress] = useState(0)
  const [progressID, setProgressID] = useState(null)
  const [showReview, setShowReview] = useState(false)
  const [hasReview, setHasReview] = useState(false)
  const [review, setReview] = useState(0)
  const [attachements, setAttachements] = useState([])
  const [loadingAttachements, setLoadingAttachements] = useState(true)
  const [nextUrl, setNextUrl] = useState('')
  const [percent, setPercent] = useState(0)
  const Attachements = () => {
    if (loadingAttachements) {
      return (
        <div className='text-center'>
          <i className='fas fa-spinner fa-spin'></i>
        </div>
      )
    }
    if (attachements.length !== 0) {
      return (
        <>
          <h2>Attachments</h2>
          <ul>
            {attachements.map((e, k) => (
              <li key={k} className='py-1'>
                <a href={e.field_attachment} target='_blank' rel='noreferrer'>
                  <i className='fas fa-download me-2'></i>
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )
    } else {
      return <></>
    }
  }

  const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()
  const userID = useSelector(state => state.User?.user?.uid)
  const { id, chapterId } = props?.match?.params
  const refreshReview = data => {
    setHasReview(true)
    setReview(data.field_review[0].value)
  }
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
  let url = `/api/program/${id}`
  useEffect(toogler, [])

  useEffect(() => {
    setData({})
    setError(false)
    axios
      .get(`/api/chapter/${chapterId}`)
      .then(res => setData(res.data[0]))
      .catch(() => setError(true))
  }, [chapterId])

  useEffect(() => {
    setAttachements([])
    setLoadingAttachements(true)
    setLoadingCourses(true)
    axios
      .get(`/api/program/${id}/chapters`)
      .then(res => {
        setCourses(
          res.data.map(e => ({
            id: e.nid,
            title: e.title,
            time: e.field_video_duration,
            done: false,
          }))
        )
        setLoadingCourses(false)
      })
      .catch(() => {
        setLoadingCourses(false)
      })

    axios
      .get(url)
      .then(res => {
        setError(false)
        // setLoading(false)
        setProgram(res.data[0])
      })
      .catch(() => {
        // setLoading(false)
        setError(true)
      })

    axios
      .get(`/api/student/program/${id}/progress`)
      .then(res => {
        const progress = res.data.sort((a, b) => a.nid - b.nid)
        setProgress(progress[0].field_process ?? 0)
        setProgressID(progress[0].nid)
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
      .get(`/api/student/program/${id}/review`)
      .then(res => {
        if (res.data?.[0]) {
          setHasReview(true)
          setReview(res.data?.[0].field_review)
        }
      })
      .catch(() => {})

    axios
      .get('/api/programs')
      .then(res => {
        const list = res.data.map(e => e.nid)
        const nextProgram = list[list.indexOf(id) + 1]
        axios
          .get(`/api/program/${nextProgram}/chapters`)
          .then(res => {
            const nextUrl = `/program/${nextProgram}/${res.data?.[0]?.nid}`
            setNextUrl(nextUrl)
          })
          .catch(() => null)
      })
      .catch(() => null)
  }, [id, url, userID])

  const sections = data?.field_paragraphs_export ?? []
  const updatePosition = () => {
    const sidebarDOM = sideBarRef?.current
    const videoDOM = videoRef?.current
    const status = sidebarDOM?.className === 'toogled'

    const box = videoDOM?.getClientRects()?.[0]
    const sideBarStart = box?.x + box?.width
    if (window.innerWidth > 768) {
      if (sidebarDOM) sidebarDOM.style.left = status ? `${sideBarStart}px` : '100%'
    } else {
      if (sidebarDOM) sidebarDOM.style.left = status ? `0px` : '100%'
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
        if (nextProgress * 100 > progress) {
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
      }
    },
    field_video: data?.field_video,
  }

  if (error) return <></>

  const sectionNumber = courses.findIndex(e => e.id === data?.nid) + 1

  const isLastProgram = localStorage.getItem(LAST_PROGRAM_ID) === data.field_program
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
        isLastProgram={isLastProgram}
        nextUrl={nextUrl}
      />
      <TopBar
        prefix={`${parse(program?.title ?? '')} >  Section ${sectionNumber}`}
        title={parse(data?.title ?? '')}
      />
      <SideBar
        progress={progress}
        useRef={sideBarRef}
        toogler={toogler}
        nextUrl={nextUrl}
        programId={id}
        setPercent={setPercent}
        progressID={progressID}
        items={courses}
        program={program}
        loadingcourses={loadingcourses}
        currentChapter={currentChapter}
      />
      <CoursVideo {...videoData} />
      <div className='container video-action'>
        <Link to='/programs' className='btn btn-dark'>
          <ListIcon />
          <span className='ms-2'>All chapters</span>
        </Link>

        {percent === 100 ? (
          <Link to={nextUrl} className='btn btn-dark' disabled>
            <ChapterIcon />
            <span className='ms-2'>Next Chapter</span>
          </Link>
        ) : (
          <button className='btn btn-dark' disabled>
            <ChapterIcon />
            <span className='ms-2'>Next Chapter</span>
          </button>
        )}
      </div>
      <div className='container course-detail'>
        <div ref={documentRef}>
          {sections.map((e, k) => (
            <React.Fragment key={k}>
              <h2>{parse(e.title)}</h2>
              <p dangerouslySetInnerHTML={{ __html: parse(e.description) }}></p>
            </React.Fragment>
          ))}
          <Attachements />
          <Professor {...professorData} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Chapter
