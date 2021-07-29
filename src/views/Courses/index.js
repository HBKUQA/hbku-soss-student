import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopBar from './TopBar'
import Filter from './Filter'
import CourseList from './CourseList'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../../params'

const programTopData = {
  title: 'List all chapters',
  category: 'Chapters',
  icon: 'fas fa-user-graduate',
}

function Courses() {
  const [courses, setCourses] = useState([])
  const [progress, setProgress] = useState({})
  useEffect(() => {
    axios
      .get('/api/programs')
      .then(res => {
        setCourses(
          res.data.map(e => {
            const chapters = e.field_chapters ?? ''
            return {
              id: e.nid,
              thumbnail: BASE_URL + e.field_introduction,
              acchivement: '50',
              primary: `/program/${e.nid}/${chapters.split(',')?.[0]}`,
              title: e.title,
              description: e.field_description,
              secondary: `/program/${e.nid}`,
              locked: e.status === '0',
            }
          })
        )
      })
      .catch(() => {})

    axios
      .get('/api/student/progress')
      .then(res => {
        const tmp = {}
        res.data.forEach(e => {
          tmp[parseInt(e.field_program)] = e.field_process
        })
        setProgress(tmp)
      })
      .catch(() => {
        setProgress({})
      })
  }, [])

  return (
    <>
      <Header />
      <TopBar {...programTopData} />
      <div className='container'>
        <Filter />
        <CourseList
          items={courses.map(e => ({
            ...e,
            acchivement: progress?.[e.id] ?? '0',
          }))}
        />
      </div>
      <Footer />
    </>
  )
}
export default Courses
