// import { useState } from 'react'

function Professor(props) {
  // const [show, setShow] = useState(false)
  // const showLess = str => (show ? str : str.split('.').slice(0, 3).join('.') + '...')

  return (
    <div className='professor-card'>
      <h2>Contact Us</h2>
      <div className='professor-card-container'>
        <img src={props.avatar} alt={props.name} />
        <div>
          <span className='name'>Support Team</span>
          <div className='is-grid professor-grid'>
            <span>
              <i className='fas me-2 fa-envelope'></i>
              <span>orientation@hbku.edu.qa </span>
            </span>
            <span>
              <i className='fas me-2 fa-clock'></i>
              <span>Sun-Thur 8:00 to 16:00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Professor
