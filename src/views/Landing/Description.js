function Description(props) {
  return (
    <>
      {props.title ? <h2>{props.title}</h2> : <></>}
      <p className='text-justify landing-description'>{props.description}</p>
    </>
  )
}

export default Description
