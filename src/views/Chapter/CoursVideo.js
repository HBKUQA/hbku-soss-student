import { BASE_URL } from '../../params'
function CoursVideo(props) {
  if (props.field_video === undefined)
    return (
      <div className='vider-container'>
        <div className='container'>
          <div ref={props.videoRef}></div>
        </div>
      </div>
    )
  return (
    <div className='vider-container'>
      <div className='container'>
        <div ref={props.videoRef}>
          <video onEnded={props.end} src={BASE_URL + props.field_video} controls autoPlay></video>
        </div>
      </div>
    </div>
  )
}

export default CoursVideo
