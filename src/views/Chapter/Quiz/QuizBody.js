import parse from 'html-react-parser'
import style from './quiz.module.scss'
import QuizSection from './QuizSection'

function QuizBody({
  errors,
  sendData,
  updateResponses,
  responses = {},
  field_description,
  questions = [],
  quizResponse,
}) {
  if (quizResponse) {
    return (
      <div>
        <h2 className={style.title}>Quiz</h2>
        <p>{field_description}</p>
        {quizResponse.map(({ id, quiz_question, answers }) => {
          return (
            <div key={id} className={style.question}>
              <h3>{parse(quiz_question)}</h3>
              <ul className={style.response}>
                {answers.map(({ id, quiz_answer, quiz_answer_is_correct }) => (
                  <li key={id} style={{ color: quiz_answer_is_correct ? 'green' : 'red' }}>
                    {quiz_answer}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        <button onClick={sendData} className='btn btn-dark w100'>
          continue
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={sendData}>
      <h2 className={style.title}>Quiz</h2>
      <p>{field_description}</p>
      {questions.map(({ id, quiz_question, answers = [] }) => (
        <QuizSection
          key={id}
          questionId={id}
          quizResponse={quizResponse?.field_quiz_multiple_questions_export}
          responses={responses[id]}
          error={errors[id]}
          quiz_answers={answers || []}
          quiz_question={quiz_question}
          setResponses={data => {
            const newResponses = JSON.parse(JSON.stringify(responses))
            newResponses[id] = data
            updateResponses(newResponses)
          }}
        />
      ))}

      <button type='submit' className='btn btn-dark w100'>
        Send response
      </button>
    </form>
  )
}

export default QuizBody
