import React, { useEffect, useState } from 'react'
import TopBar from './TopBar'
import SideBar from './SideBar'
import axios from 'axios'
import CoursVideo from './CoursVideo'
import Review from './Review'
import { LAST_PROGRAM_ID } from '../../params'
import parse from 'html-react-parser'
import ChapterActions from './ChapterActions'
import Layout from './Layout'
import { useQuery } from 'react-query'
import CourseDetails from './CourseDetails'

function Chapter(props) {
  const { id, chapterId } = props?.match?.params
  const {
    data = {},
    refetch: refetchData,
    isError,
  } = useQuery(`get-chapter-${chapterId}`, () =>
    axios.get(`/api/chapter/${chapterId}`).then(res => res.data[0])
  )

  const { data: program } = useQuery(`get-chapter-${chapterId}-program`, () =>
    axios.get(`/api/program/${id}`).then(res => res.data[0])
  )

  const { data: review, refetch: refetchReview } = useQuery(`get-program-review-${id}`, () =>
    axios.get(`/api/student/program/${id}/review`).then(res => res.data[0])
  )

  const {
    data: courses = [],
    isLoading: isLoadingcourses,
    isFetching: isFetchingcourses,
  } = useQuery(`get-chapter-${chapterId}-courses`, () =>
    axios.get(`/api/program/${id}/chapters`).then(res =>
      res.data.map(e => ({
        id: e.nid,
        title: e.title,
        time: e.field_video_duration,
        done: false,
      }))
    )
  )

  const [showReview, setShowReview] = useState(false)

  const loadingcourses = isLoadingcourses || isFetchingcourses

  useEffect(() => {
    refetchData()
  }, [refetchData, chapterId])

  const sections = data?.field_paragraphs_export ?? []

  const isLast = courses[courses.length - 1]?.id === chapterId

  const numberOfChapters = courses.length === 0 ? 1 : courses.length
  const chapterProgress = 1 / numberOfChapters
  const thisIndex = courses.findIndex(e => e.id === chapterId)
  const nextProgress = chapterProgress * (thisIndex + 1)

  if (isError) return <></>

  const sectionNumber = courses.findIndex(e => e.id === data?.nid) + 1
  const isLastProgram = localStorage.getItem(LAST_PROGRAM_ID) === data.field_program

  document.title = `${data?.title} - HBKU-SOOS`

  return (
    <Layout programId={id} chapterId={chapterId}>
      <Review
        refetchReview={refetchReview}
        review={review}
        show={isLast && showReview}
        isLastProgram={isLastProgram}
      />
      <TopBar
        prefix={`${parse(program?.title ?? '')} >  Section ${sectionNumber}`}
        title={parse(data?.title ?? '')}
      />
      <SideBar
        items={courses}
        program={program}
        loadingcourses={loadingcourses}
        currentChapter={chapterId}
      />
      <CoursVideo
        nextProgress={nextProgress}
        isLast={isLast}
        setShowReview={setShowReview}
        field_video={data?.field_video}
      />
      <ChapterActions />
      <CourseDetails id={id} sections={sections} />
    </Layout>
  )
}
export default Chapter
