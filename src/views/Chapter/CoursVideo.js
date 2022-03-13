import axios from 'axios'
import { BASE_URL } from '../../params'

function CoursVideo({
  setProgress,
  progress,
  nextProgress,
  videoRef,
  field_video,
  isLast,
  progressID,
  setShowReview,
}) {
  const end = () => {
    if (isLast) {
      setShowReview(true)
      axios
        .patch(`/node/${progressID}`, {
          type: 'student_progress',
          field_process: [{ value: 100 }],
        })
        .then(() => {
          setProgress(100)
        })
        .catch(() => null)
    } else if (nextProgress * 100 > progress) {
      axios
        .patch(`/node/${progressID}`, {
          type: 'student_progress',
          field_process: [{ value: nextProgress * 100 }],
        })
        .then(() => {
          setProgress(nextProgress * 100)
        })
        .catch(() => null)
    }
  }

  return (
    <div className='vider-container'>
      <div className='container'>
        <div ref={videoRef}>
          {field_video === undefined ? null : (
            <video onEnded={end} src={BASE_URL + field_video} controls autoPlay></video>
          )}
        </div>
      </div>
    </div>
  )
}

export default CoursVideo
