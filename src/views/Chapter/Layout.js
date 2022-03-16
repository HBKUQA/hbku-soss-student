import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'

function Layout({ programId, chapterId, children }) {
  const [nextUrl, setNextUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [progressID, setProgressID] = useState(null)
  const userID = useSelector(state => state.User?.user?.uid)

  const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()
  useEffect(() => {
    axios
      .get(`/api/student/program/${programId}/progress`)
      .then(res => {
        const progress = res.data.sort((a, b) => a.nid - b.nid)
        setProgress(
          isNaN(progress[0].field_process) || progress[0].field_process === ''
            ? 0
            : progress[0].field_process
        )
        setProgressID(progress[0].nid)
      })
      .catch(() => {
        axios
          .post('/node?_format=json', {
            type: 'student_progress',
            title: [{ value: `student progess ${programId}-${userID}` }],
            field_program: [{ target_id: programId }],
            field_process: [{ value: 0 }],
          })
          .then(newProgress => newProgress.data)
          .then(newProgress => {
            setProgress(0)
            setProgressID(newProgress.nid[0].value)
          })
      })
  }, [programId, userID])

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

  useEffect(() => {
    window.addEventListener('resize', () => {
      updatePosition()
    })
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const { data: list = [] } = useQuery('get-programs-list', () =>
    axios.get('/api/programs').then(res => res.data.map(e => e.nid))
  )

  const nextProgram = list[list.indexOf(programId) + 1]

  useEffect(() => {
    axios
      .get(`/api/program/${nextProgram}/chapters`)
      .then(res => {
        setNextUrl(`/program/${nextProgram}/${res.data?.[0]?.nid}`)
      })
      .catch(() => null)
  }, [nextProgram])

  return (
    <>
      <Header />
      {Children.map(children, child => {
        return cloneElement(child, {
          nextUrl,
          programId,
          chapterId,
          videoRef,
          documentRef,
          sideBarRef,
          updatePosition,
          progress,
          setProgress,
          progressID,
        })
      })}
      <Footer />
    </>
  )
}

export default Layout
