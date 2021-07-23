import { BASE_URL } from '../../params'
function CoursVideo(props) {
  return (
    <div className='vider-container'>
      <div className='container'>
        <div ref={props.videoRef}>
          <video onEnded={props.end} src={BASE_URL + props.field_video} controls></video>
        </div>
      </div>
    </div>
  )
}

export default CoursVideo
