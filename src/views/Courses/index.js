import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopBar from './TopBar'
import Filter from './Filter'
import CourseList from './CourseList'
import { programTopData, courses } from './data'

function Courses(props) {
  const filterFunction = item => true
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
