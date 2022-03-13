import axios from 'axios'
import parse from 'html-react-parser'
import { useQuery } from 'react-query'
import style from './quiz.module.scss'

function Quiz({ programId }) {
  const {
    isError,
    data: { field_description, field_quiz_multiple_questions_export: questions = [] } = {
      questions: [],
    },
  } = useQuery(`get-program-quiz-${programId}`, () =>
    axios.get(`/api/program/${programId}/quiz`).then(res => res.data[0])
  )

  const show = true
  return (
    <div className={`modal${show ? ' show' : ''}`}>
      {isError ? (
        <div className='modal-content'>
          <h2>This program doesn't have a quiz</h2>
          <button></button>
        </div>
      ) : (
        <div className='modal-content'>
          <form>
            <h2>Quiz</h2>
            <p>{field_description}</p>
            {questions.map(({ id, quiz_question, quiz_answers = [] }) => (
              <div key={id} className={style.question}>
                <h3>{parse(quiz_question)}</h3>
                {quiz_answers.map(answer => (
                  <div className={style.response} key={answer}>
                    <label>
                      <input required type='radio' name={`quiz-${id}`} />
                      <span>{answer}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type='submit' className='btn btn-dark w100'>
              Send response
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Quiz
