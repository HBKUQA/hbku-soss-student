import { useState } from 'react'

function Professor(props) {
  const [show, setShow] = useState(false)
  const showLess = str => (show ? str : str.split('.').slice(0, 3).join('.') + '...')

  return (
    <div className='professor-card'>
      <h2>Who can assist me ?</h2>
      <div className='professor-card-container'>
        <img src={props.avatar} alt={props.name} />
        <div>
          <span className='name'>{props.name}</span>
          <div className='is-grid professor-grid'>
            <span>
              <i className='fas me-2 fa-phone fa-flip-horizontal'></i>
              <span>{props.phone}</span>
            </span>
            <span>
              <i className='fas me-2 fa-envelope'></i>
              <span>{props.email}</span>
            </span>
            <span>
              <i className='fas me-2 fa-clock'></i>
              <span>{props.disponibilityTime}</span>
            </span>
            <span>
              <i className='far me-2 fa-calendar-alt'></i>
              <span>{props.disponibilityDays}</span>
            </span>
          </div>
          <p>
            {showLess(props.description)}
            <button onClick={() => setShow(!show)} className='read-more'>
              {show ? 'Hide' : 'Read more'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
export default Professor
