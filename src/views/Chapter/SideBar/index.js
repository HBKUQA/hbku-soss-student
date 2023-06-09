import { Redirect } from 'react-router-dom'
import { useEffect } from 'react'
import SideBarItem from './SideBarItem'
import Toogler from './Toogler'
import Actions from './Actions'
import Progress from './Progress'
import SidebarHeader from './SidebarHeader'
import { useSelector } from "react-redux"
import { SUPER_ADMINS } from "../../../params"

function SideBar({ sideBarRef, videoRef, documentRef, updatePosition, ...props }) {
  const progress = ((parseInt(props.progress) ?? 0) / 100).toFixed(2)
  const numberOfChapters = props.items.length === 0 ? 1 : props.items.length
  const chapterProgress = 1 / numberOfChapters
  const progressValue = props.items.filter(
    (_, k) => (chapterProgress * k).toFixed(2) < progress
  ).length

  const progressMax = props.items.length === 0 ? 1 : props.items.length
  const percent = (progressValue * 100) / progressMax;

  const userID = useSelector(state => state.User?.user?.uid)
  let superAdmin = false


  if(SUPER_ADMINS.includes(userID)){
    superAdmin = true
  }

  const cleanData = (e, k) => ({
    ...e,
    currentChapter: e.id === props.currentChapter,
    checked: (chapterProgress * k).toFixed(2) < progress,
    link: superAdmin ? true :
        ((chapterProgress * k).toFixed(2) < progress ||
      (chapterProgress * (k - 1)).toFixed(2) < progress) ,
    programId: props.programId,
  })

  const toogler = () => {
    const sidebarDOM = sideBarRef?.current
    const videoDOM = videoRef?.current
    const documentDOM = documentRef?.current
    const status = sidebarDOM?.className === 'toogled'
    if (sidebarDOM) sidebarDOM.className = status ? '' : 'toogled'
    if (videoDOM) videoDOM.className = status ? '' : ' toogled'
    if (documentDOM) documentDOM.className = status ? '' : ' toogled'
    updatePosition()
  }

  useEffect(updatePosition, [updatePosition])

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
    <aside ref={sideBarRef}>
      <Toogler toogler={toogler} />
      <Actions nextUrl={props.nextUrl} percent={percent} />
      <Progress percent={percent} />
      <div>
        <SidebarHeader toogler={toogler} title={props.program?.title ?? ''} />
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
