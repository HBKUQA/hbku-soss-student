import { BASE_URL } from '../../params'

function CoursVideo({ videoRef, field_video }) {
  const end = () => {
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
