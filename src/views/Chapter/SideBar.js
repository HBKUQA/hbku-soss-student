import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

const formatTime = seconds => {
  const m = parseInt(seconds / 60)
  const s = parseInt(seconds % 60)
  return `${m} min ${s} s`
}
function SideBarItem(props) {
  const InnerLi = () => {
    if (props.link)
      return (
        <div>
          <Link to={`/program/${props.programId}/${props.id}`} disabled={true}>
            <div className='title'>{parse(props.title)}</div>
            <div className='time'>
              <i className='fas me-2 fa-stopwatch' />
              {formatTime(props.time)}
            </div>
          </Link>
        </div>
      )
    return (
      <div>
        <div className='disabled'>
          <div className='title'>{parse(props.title)}</div>
          <div className='time'>
            <i className='fas me-2 fa-stopwatch' />
            {formatTime(props.time)}
          </div>
        </div>
      </div>
    )
  }

  const liClass = props.currentChapter ? 'active' : ''
  return (
    <li className={liClass}>
      <div className='li-container'>
        <label className='checkbox-container'>
          <input type='checkbox' checked={props.checked} onChange={() => null} />
          <span className='checkmark'></span>
        </label>
        <InnerLi />
      </div>
    </li>
  )
}

function SideBar(props) {
  const progress = ((parseInt(props.progress) ?? 0) / 100).toFixed(2)
  const numberOfChapters = props.items.length === 0 ? 1 : props.items.length
  const chapterProgress = 1 / numberOfChapters

  const progressValue = props.items.filter(
    (_, k) => (chapterProgress * k).toFixed(2) < progress
  ).length

  const progressMax = props.items.length === 0 ? 1 : props.items.length
  const percent = (progressValue * 100) / progressMax

  const cleanData = (e, k) => ({
    ...e,
    currentChapter: e.id === props.currentChapter,
    checked: (chapterProgress * k).toFixed(2) < progress,
    link: Math.random() < 0.5,
    programId: props.programId,
  })

  return (
    <aside ref={props.useRef}>
      <button id='sidebar-toogler' onClick={props.toogler}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'>
          <path
            fillRule='evenodd'
            d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
          />
        </svg>
      </button>
      <div className='actions'>
        <Link to='/programs' className='btn btn-outline-dark'>
          List all chapters
        </Link>
        <Link to={`/program/${props.programId}`} className='btn btn-outline-dark'>
          Next Chapter
        </Link>
      </div>
      <div className='py-3'>
        <div className='progress'>
          <div className='progress-bar' style={{ width: `${percent}%` }}></div>
          <span className='progress-label'>{percent.toFixed(0)}%</span>
        </div>
      </div>
      <div>
        <div className='header'>
          <div>
            <span>Section content</span>
            <button className='btn btn-link close-side-bar' onClick={props.toogler}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'>
                <path
                  fillRule='evenodd'
                  d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
                />
              </svg>
            </button>
          </div>
        </div>
        <ul className='lessons-list'>
          {props.items.map(cleanData).map((e, k) => (
            <SideBarItem key={k} {...e} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
export default SideBar
