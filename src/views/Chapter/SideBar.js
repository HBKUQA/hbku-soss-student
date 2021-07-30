import { Link } from 'react-router-dom'

function SideBar(props) {
  const progress = ((parseInt(props.progress) ?? 0) / 100).toFixed(2)
  const numberOfChapters = props.items.length === 0 ? 1 : props.items.length
  const chapterProgress = 1 / numberOfChapters

  const formatTime = seconds => {
    const m = parseInt(seconds / 60)
    return `${m} min`
  }

  const progressValue = props.items.filter(
    (e, k) => (chapterProgress * k).toFixed(2) < progress
  ).length

  const progressMax = props.items.length === 0 ? 1 : props.items.length
  const percent = (progressValue * 100) / progressMax

  return (
    <>
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
              {/* <button className='btn btn-link' onClick={props.toogler}>
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
              </button> */}
            </div>
          </div>
          <ul className='lessons-list'>
            {props.items.map((e, k) => (
              <li className={e.id === props.currentChapter ? 'active' : ''} key={k}>
                <div className='li-container'>
                  <label className='checkbox-container'>
                    <input
                      type='checkbox'
                      checked={(chapterProgress * k).toFixed(2) < progress}
                      onChange={() => null}
                    />
                    <span className='checkmark'></span>
                  </label>
                  <div>
                    {parseInt((chapterProgress * k).toFixed(2)) <= parseInt(progress) ? (
                      <Link to={`/program/${props.programId}/${e.id}`} disabled={true}>
                        <div className='title'>{e.title}</div>
                        <div className='time'>
                          <i className='fas me-2 fa-stopwatch' />
                          {formatTime(e.time)}
                        </div>
                      </Link>
                    ) : (
                      <div className='disabled'>
                        <div className='title'>{e.title}</div>
                        <div className='time'>
                          <i className='fas me-2 fa-stopwatch' />
                          {formatTime(e.time)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}
export default SideBar
