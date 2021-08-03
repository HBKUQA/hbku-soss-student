import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ReactComponent as ChapterIcon } from '../../assets/svg/chapter.svg'
import { ReactComponent as ListIcon } from '../../assets/svg/bullet-list-marked.svg'

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

  if (props.isLastProgram && props.hasReview)
    return (
      <div className={`modal${props.show ? ' show' : ''}`}>
        <div className='modal-content text-start'>
          <div className='text-start pt-4'>
            <p className='pb-4'>Dear Student,</p>
            <p className='pb-4'>
              Congratulations on reaching this chapter! We hope that you have gained the needed
              knowledge to tackle this year successfully. To complete your orientation, you are
              required to register for the advising session for your program through this link:
              <a
                target='_blank'
                rel='noreferrer'
                href='https://hbku.wufoo.com/forms/advising-session-registration-202122/'>
                https://hbku.wufoo.com/forms/advising-session-registration-202122/
              </a>
            </p>
            <p className='pb-4'>You will receive a link with the session link and timing.</p>
            <p className='pb-4'>
              For any questions, comments or feedback on your orientation experience, please feel
              free to email us at{' '}
              <a href='mailto:orientation@hbku.edu.qa'>orientation@hbku.edu.qa</a>
            </p>
          </div>

          <Link to='/programs' className='btn btn-dark'>
            Back to all chapters
          </Link>
        </div>
      </div>
    )

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
          <Link to={props.nextUrl} className='btn btn-primary hover-outline'>
            <ChapterIcon />
            <span className='ms-2'>Go to next chapter</span>
          </Link>
          <Link to='/programs' className='btn btn-dark'>
            <ListIcon />
            <span className='ms-2'>Back to all chapters</span>
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
