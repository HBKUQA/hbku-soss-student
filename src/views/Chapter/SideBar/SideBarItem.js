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

export default SideBarItem
