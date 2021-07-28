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
            <div className='actions'>
              <Link to={props.primaryAction.link} className='btn btn-primary'>
                {props.primaryAction.text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProgramTopBar
