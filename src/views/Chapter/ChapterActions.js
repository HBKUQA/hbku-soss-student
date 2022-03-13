import { ReactComponent as ListIcon } from '../../assets/svg/bullet-list-marked.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as ChapterIcon } from '../../assets/svg/chapter.svg'

function NextBtn({ percent = 0, nextUrl }) {
  return percent === 100 ? (
    <a href={nextUrl} className='btn btn-dark' disabled>
      <ChapterIcon />
      <span className='ms-2'>Next Chapter</span>
    </a>
  ) : (
    <button className='btn btn-dark' disabled>
      <ChapterIcon />
      <span className='ms-2'>Next Chapter</span>
    </button>
  )
}

function ChapterActions({ nextUrl, percent = 0 }) {
  return (
    <div className='container video-action'>
      <Link to='/programs' className='btn btn-dark'>
        <ListIcon />
        <span className='ms-2'>All chapters</span>
      </Link>
      <NextBtn nextUrl={nextUrl} percent={percent} />
    </div>
  )
}

export default ChapterActions
