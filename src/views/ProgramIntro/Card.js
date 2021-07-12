function Card(props) {
  if (props.type === 'article')
    return (
      <div>
        <img src={props.thumbnail} alt={props.title} />
        <span className='title'>{props.title}</span>
        <span className='text'>{props.text}</span>
      </div>
    )
  return (
    <div>
      <i className={props.icon + ' me-2'}></i>
      <span>{props.text}</span>
    </div>
  )
}
export default Card
