import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Review(props) {
  const [rate, setRate] = useState(0)
  const user = useSelector(state => state.User.user)
  const sendReview = () => {
    const data = {
      type: 'student_review',
      title: [{ value: `student review ${props.programId}-${user.uid}` }],
      field_program: [{ target_id: props.programId }],
      field_review: [{ value: rate }],
    }
    axios
      .post('/node?_format=json', data)
      .then(res => {
        props.refreshReview(res.data)
      })
      .catch(() => {})
  }
  if (!props.add) return <></>
  if (props.hasReview)
    return (
      <div className={`modal${props.show ? ' show' : ''}`}>
        <div className='modal-content'>
          <h3>Thank you for your review</h3>
          <div className='review text-primary'>
            {Array.from({ length: 5 }).map((e, k) => (
              <i key={k} className={`${k + 1 <= props.review ? 'fas fa-star' : 'far fa-star'}`}></i>
            ))}
          </div>
          <Link to='/programs' className='btn btn-dark'>
            Back to programs
          </Link>
        </div>
      </div>
    )
  return (
    <div className={`modal${props.show ? ' show' : ''}`}>
      <div className='modal-content'>
        <h3>Do you want to review this chapter ?</h3>
        <div className='review text-primary'>
          {Array.from({ length: 5 }).map((e, k) => (
            <i
              key={k}
              onClick={() => setRate(k + 1)}
              className={`${k + 1 <= rate ? 'fas fa-star' : 'far fa-star'}`}></i>
          ))}
        </div>
        <button onClick={sendReview} disabled={rate === 0} className='btn btn-dark'>
          Send review
        </button>
      </div>
    </div>
  )
}

export default Review
