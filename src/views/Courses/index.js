import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopBar from './TopBar'
import Filter from './Filter'
import CourseList from './CourseList'
import axios from 'axios'
import {
  programTopData,
  // courses
} from './data'
import { useState } from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../../params'
function Courses(props) {
  const filterFunction = item => true
  const [courses, setCourses] = useState([])
  useEffect(() => {
    axios
      .get('/api/programs')
      .then(res => {
        setCourses(
          res.data.map(e => {
            const chapters = e.field_chapters ?? ''
            return {
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
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Header />
      <TopBar {...programTopData} />
      <div className='container'>
        <Filter />
        <CourseList items={courses.filter(filterFunction)} />
      </div>
      <Footer />
    </>
  )
}
export default Courses
