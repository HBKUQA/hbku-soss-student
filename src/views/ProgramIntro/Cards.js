import Card from './Card'
function Cards(props) {
  return (
    <div className={'card-container' + (props.isRelated ? ' is-related' : '')}>
      {props.items.map((e, k) => (
        <div className='card' key={k}>
          <div className='card-header'>{e.title}</div>
          <div className='card-body'>
            {e.items.map((i, ki) => (
              <Card key={ki} {...i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Cards
