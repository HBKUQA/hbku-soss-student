function ProgramTopBar(props) {
  return (
    <div className='topbar' id='top'>
      <div className='container landing-container'>
        <div>
          <h1>Virtual Student Orientation</h1>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  )
}
export default ProgramTopBar
