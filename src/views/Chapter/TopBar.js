function TopBar(props) {
  return (
    <div className='topbar' id='top'>
      <div className='container'>
        <h3 className='mb-4'>
          <b>{props.prefix} : </b>
          {props.title}
        </h3>
      </div>
    </div>
  )
}
export default TopBar
