function TopBar(props) {
  return (
    <div className='topbar' id='top'>
      <div className='container'>
        <div className={props.toogled ? ' toogled' : ''}>
          <h3 className='mb-4 section_title'>
            <b>{props.prefix} : </b>
            {props.title}
          </h3>
        </div>
      </div>
    </div>
  )
}
export default TopBar
