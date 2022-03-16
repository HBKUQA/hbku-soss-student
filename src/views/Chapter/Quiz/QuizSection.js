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
      {quiz_answers.map(answer => (
        <div className={style.response} key={answer}>
          <label>
            <input
              checked={responses.includes(answer)}
              value={answer}
              type='checkbox'
              onChange={() => {
                let newResponses = JSON.parse(JSON.stringify(responses))
                if (newResponses.includes(answer))
                  newResponses = newResponses.filter(answ => answ !== answer)
                else newResponses.push(answer)
                setResponses(newResponses)
              }}
            />
            <span>{answer}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default QuizSection
