import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import QuizBody from './QuizBody'

function Quiz({ programId, show, setShowQuiz, setShowReview }) {
  const [responses, setResponses] = useState({})
  const [errors, setErrors] = useState({})
  const user = useSelector(state => state.User.user)

  const {
    data: quizResponse,
    isLoading: isLoadingQuizResponse,
    isFetching: isFetchingQuizResponse,
  } = useQuery(`get-program-quiz-${programId}-response`, () =>
    axios.get(`/api/student/${programId}/quiz`).then(res => res.data[0])
  )

  const {
    isLoading,
    isFetching,
    isError,
    data: { nid, field_description, field_quiz_multiple_questions_export: questions = [] } = {
      questions: [],
    },
  } = useQuery(`get-program-quiz-${programId}`, () =>
    axios.get(`/api/program/${programId}/quiz`).then(res => {
      const { field_quiz_multiple_questions_export } = res.data[0]

      const errors = {}
      const responses = {}

      field_quiz_multiple_questions_export.forEach(question => {
        const { id } = question
        responses[id] = []
        errors[id] = null
      })

      setErrors(errors)
      setResponses(responses)
      return res.data[0]
    })
  )

  const sendData = event => {
    event.preventDefault()

    if (quizResponse?.field_quiz_multiple_questions_export || isError) {
      setShowQuiz(false)
      setShowReview(true)
      return
    }

    const newErrors = {}

    let canSend = true

    questions.forEach(({ id }) => {
      if (responses[id].length === 0) {
        canSend = false
        newErrors[id] = 'this Question is required !'
      } else errors[id] = null
    })
    setErrors(newErrors)
    if (canSend)
      axios
        .post('/api/program/quiz/student', {
          quiz_id: nid,
          program_id: programId,
          student_id: user.uid,
          quiz_multiple_questions: questions.map(({ quiz_question, id: qid, answers }) => ({
            quiz_question: quiz_question,
            quiz_answers: answers.map(({ id: answerId, quiz_answer, quiz_answer_is_correct }) => ({
              answer: quiz_answer,
              correct: !(quiz_answer_is_correct ^ responses[qid].includes(answerId)),
            })),
          })),
        })
        .then(() => {
          setShowQuiz(false)
          setShowReview(true)
        })
        .catch(() => null)
  }

  return (
    <div className={`modal${show ? ' show' : ''}`}>
      {isError ? (
        <div className='modal-content'>
          <h2>This program doesn't have a quiz</h2>
          <button onClick={sendData} className='btn btn-dark w100'>
            Contiune
          </button>
        </div>
      ) : (
        <div className='modal-content'>
          {isLoading || isFetching || isLoadingQuizResponse || isFetchingQuizResponse ? (
            <i className='fas fa-spinner fa-spin' />
          ) : (
            <QuizBody
              errors={errors}
              updateResponses={setResponses}
              responses={responses}
              quizResponse={quizResponse?.field_quiz_multiple_questions_export}
              questions={questions}
              field_description={field_description}
              sendData={sendData}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Quiz
