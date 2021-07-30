import { Link } from 'react-router-dom'
import lock from '../../assets/svg/lock.svg'
function Card(props) {
  const firstLink = props.secondary + '/' + props?.chapters?.[0]
  const OverThumb = () => {
    if (props.locked)
      return (
        <div className='overlay locked'>
          <img src={lock} alt='locked' />
        </div>
      )
    return (
      <div className='overlay'>
        <Link to={firstLink} className='thumbnail-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
          </svg>
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
        <img src={props.thumbnail} alt={props.title} />
        {/* <video className='thumbnail'>
          <source src={props.thumbnail} />
        </video> */}
        <OverThumb />
        <div className='progress'>{parseInt(props.acchivement)}</div>
      </div>
      <div className='card-body'>
        <h2>{props.title}</h2>
        <div>
          <div className='actions'>
            {props.locked ? (
              <>
                <button to={firstLink} disabled className='btn big-text hover-outline btn-primary'>
                  Start
                </button>
              </>
            ) : (
              <>
                <Link to={firstLink} className='btn big-text hover-outline btn-primary'>
                  Start
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseList(props) {
  return (
    <div className='courses'>
      {props.items.map((e, k) => {
        return <Card key={k} chapters={props.chapters[e.id]} {...e} />
      })}
    </div>
  )
}

export default CourseList
