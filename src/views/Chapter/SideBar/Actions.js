import { Link } from 'react-router-dom'
import { ReactComponent as ChapterIcon } from '../../../assets/svg/chapter.svg'
import { ReactComponent as ListIcon } from '../../../assets/svg/bullet-list-marked.svg'

function Actions({ percent, nextUrl }) {
  return (
    <div className='actions'>
      <Link to='/programs' className='btn btn-outline-dark'>
        <ListIcon />
        <span className='ms-2'>All chapters</span>
      </Link>

      {percent === 100 ? (
        <a href={nextUrl} className='btn btn-outline-dark' disabled>
          <ChapterIcon />
          <span className='ms-2'>Next Chapter</span>
        </a>
      ) : (
        <button className='btn btn-outline-dark' disabled>
          <ChapterIcon />
          <span className='ms-2'>Next Chapter</span>
        </button>
      )}
    </div>
  )
}

export default Actions
