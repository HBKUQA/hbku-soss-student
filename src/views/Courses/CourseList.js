import { Link } from 'react-router-dom'
import lock from '../../assets/svg/lock.svg'
import play from '../../assets/svg/video.svg'
import exclamation from '../../assets/svg/exclamation.svg'

import { professorData } from '../Landing/data'
import parse from 'html-react-parser'
import Professor from '../Landing/Professor'
function Card(props) {
  const firstLink = props.secondary + '/' + props?.chapters?.[0]
  const OverThumb = () => {
    if (props.locked)
      return (
        <div className='overlay'>
          <img src={lock} alt='locked' className='thumbnail-icon' />
        </div>
      )
    return (
      <div className='overlay'>
        <Link to={firstLink} className='thumbnail-icon'>
          <img src={play} alt='locked' className='thumbnail-icon' />
        </Link>
      </div>
    )
  }

  return (
    <div className={props.locked ? 'course-card tooltip' : 'course-card'}>
      {props.locked ? (
        <>
          <span className='tooltiptext'>
            Dear student, in order to activate this chapter, you should complete the previous one
          </span>
        </>
      ) : (
        <></>
      )}
      <div className='thumbnail-container'>
        <img src={props.thumbnail} alt={parse(props.title)} />
        {/* <video className='thumbnail'>
          <source src={props.thumbnail} />
        </video> */}
        <OverThumb />
        <div className='progress'>{parseInt(props.acchivement)}</div>
      </div>
      <div className='card-body'>
        <span className='chapter-badge'>Chapter {props.order}</span>
        <h2>{parse(props.title)}</h2>
        <div>
          {!props.isRequired ? (
            <div className='actions'>
              <button
                to={firstLink}
                disabled
                className='btn big-text show-btn hover-outline btn-primary'>
                Start
              </button>
              <span className='mandatory'>
                <img src={exclamation} alt='exclamation' />
                mandatory
              </span>
            </div>
          ) : (
            <div className='actions'>
              <Link to={firstLink} className='btn big-text show-btn hover-outline btn-primary'>
                Start
              </Link>
              <span className='video-count'></span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CourseList(props) {
  return (
    <div>
      <div className='courses'>
        {props.items.map((e, k) => {
          return (
            <Card
              key={k}
              isRequired={Math.random() < 0.5}
              chapters={props.chapters[e.id]}
              {...e}
              order={k + 1}
            />
          )
        })}
      </div>
      <Professor {...professorData} />
    </div>
  )
}

export default CourseList
