import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function Review(props) {
  const [rate, setRate] = useState(0)

  const sendReview = () => {
    const data = {
      // title: 'Student Review 1-4',
      type: 'student_review',
      field_program: [{ value: props.programId }],
      field_review: [{ value: rate }],
    }

    axios.post('/node', data)
    console.log(data)
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
        <h3>Do you want to review this program ?</h3>
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
