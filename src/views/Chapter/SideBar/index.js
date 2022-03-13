import { Link, Redirect } from 'react-router-dom'
import parse from 'html-react-parser'

import { ReactComponent as ChapterIcon } from '../../assets/svg/chapter.svg'
import { ReactComponent as ListIcon } from '../../assets/svg/bullet-list-marked.svg'
import { useEffect, useRef } from 'react'
import SideBarItem from './SideBarItem'
import Toogler from './Toogler'

function SideBar(props) {
  const progress = ((parseInt(props.progress) ?? 0) / 100).toFixed(2)
  const numberOfChapters = props.items.length === 0 ? 1 : props.items.length
  const chapterProgress = 1 / numberOfChapters
  const oldPercent = useRef(0)
  const progressValue = props.items.filter(
    (_, k) => (chapterProgress * k).toFixed(2) < progress
  ).length

  const progressMax = props.items.length === 0 ? 1 : props.items.length
  const percent = (progressValue * 100) / progressMax

  const { setPercent } = props
  useEffect(() => {
    if (oldPercent.current === percent) return
    setPercent(percent)
  }, [percent, setPercent])

  const cleanData = (e, k) => ({
    ...e,
    currentChapter: e.id === props.currentChapter,
    checked: (chapterProgress * k).toFixed(2) < progress,
    link:
      (chapterProgress * k).toFixed(2) < progress ||
      (chapterProgress * (k - 1)).toFixed(2) < progress,
    programId: props.programId,
  })

  const sidebarList = props.items.map(cleanData)
  if (!props.loadingcourses) {
    const accesible = sidebarList.filter(e => e.link)
    const current = sidebarList.filter(e => e.id === props.currentChapter)[0]
    if (current === undefined) return <Redirect to='/programs'></Redirect>
    if (!current.link && props.progressID !== null) {
      return <Redirect to={`/program/17/${accesible[accesible.length - 1].id}`} />
    }
  }

  return (
    <aside ref={props.useRef}>
      <Toogler toogler={props.toogler} />
      <div className='actions'>
        <Link to='/programs' className='btn btn-outline-dark'>
          <ListIcon />
          <span className='ms-2'>All chapters</span>
        </Link>

        {percent === 100 ? (
          <a href={props.nextUrl} className='btn btn-outline-dark' disabled>
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
      <div className='py-3'>
        <div className='progress'>
          <div className='progress-bar' style={{ width: `${percent}%` }}></div>
          <span className='progress-label'>{percent.toFixed(0)}%</span>
        </div>
      </div>
      <div>
        <div className='header'>
          <div>
            <span>{parse(props.program?.title ?? '')} Chapter Content</span>
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
          {sidebarList.map((e, k) => (
            <SideBarItem key={k} {...e} />
          ))}
        </ul>
      </div>
    </aside>
  )
}
export default SideBar
