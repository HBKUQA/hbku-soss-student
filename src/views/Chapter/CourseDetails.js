import { Fragment } from 'react'
import { professorData } from '../Landing/data'
import Professor from '../Landing/Professor'
import parse from 'html-react-parser'
import Attachements from './Attachements'

function CourseDetails({ documentRef, id, sections = [] }) {
  return (
    <div className='container course-detail'>
      <div ref={documentRef}>
        {sections.map((e, k) => (
          <Fragment key={k}>
            <h2>{parse(e.title)}</h2>
            <p dangerouslySetInnerHTML={{ __html: parse(e.description) }}></p>
          </Fragment>
        ))}
        <Attachements id={id} />
        <Professor {...professorData} />
      </div>
    </div>
  )
}

export default CourseDetails
