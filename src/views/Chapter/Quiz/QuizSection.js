import parse from 'html-react-parser'
import style from './quiz.module.scss'

function QuizSection({
  quiz_question,
  error,
  setResponses = () => null,
  quiz_answers = [],
  responses = [],
}) {
  return (
    <div className={style.question}>
      <h3>{parse(quiz_question)}</h3>
      {error && <span className={style.errorDiv}>{error}</span>}
      {quiz_answers.map(({ id, quiz_answer, ...answer }) => (
        <div className={style.response} key={id}>
          <label>
            <input
              checked={responses.includes(id)}
              value={quiz_answer}
              type='checkbox'
              onChange={() => {
                let newResponses = JSON.parse(JSON.stringify(responses))
                if (newResponses.includes(id))
                  newResponses = newResponses.filter(answ => answ !== id)
                else newResponses.push(id)
                setResponses(newResponses)
              }}
            />
            <span>{quiz_answer}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default QuizSection
