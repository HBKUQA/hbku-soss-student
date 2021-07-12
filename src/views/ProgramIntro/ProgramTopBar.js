import { Link } from 'react-router-dom'

function ProgramTopBar(props) {
  return (
    <div className='topbar' id='top'>
      <div className='container'>
        <div className='is-grid has-2'>
          <div>
            <div className='video-container'>
              <video controls poster={props.video.poster}>
                <source src={props.video.url}></source>
              </video>
            </div>
          </div>
          <div>
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <div>
              <Link to={props.primaryAction.link} className='btn btn-primary me-3'>
                {props.primaryAction.text}
              </Link>
              <Link to={props.secondaryAction.link} className='btn btn-outline-white'>
                {props.secondaryAction.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProgramTopBar
