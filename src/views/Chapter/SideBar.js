import { Link } from 'react-router-dom'

function SideBar(props) {
  const formatTime = seconds => seconds
  return (
    <>
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
      <aside ref={props.useRef}>
        <div className='actions'>
          <Link to='/programs' className='btn btn-outline-dark'>
            Main Menu
          </Link>
          <Link to='/program/1' className='btn btn-outline-dark'>
            Section Details
          </Link>
        </div>
        <div>
          {/* ={courseSections} currentChapter={currentChapter}  */}
          {/* 
            { id: '1', : 'Welcome Note by HBKU Leadership', time: 675, done: true },
            { id: '2', title: 'What you should known about HBKU', time: 1211, done: true },
          */}
          <div className='header'>
            <div>
              <span>Section content</span>
              <button className='btn btn-link' onClick={props.toogler}>
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
            {props.items.map((e, k) => (
              <li className={e.id === props.currentChapter ? 'active' : ''} key={k}>
                <div className='li-container'>
                  <label className='checkbox-container'>
                    <input type='checkbox' defaultChecked={e.done} />
                    <span className='checkmark'></span>
                  </label>
                  <div>
                    <Link to={`/program/1/${e.id}`}>
                      <div className='title'>{e.title}</div>
                      <div className='time'>
                        <i className='fas me-2 fa-stopwatch' />
                        {formatTime(e.time)}
                      </div>
                    </Link>
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
