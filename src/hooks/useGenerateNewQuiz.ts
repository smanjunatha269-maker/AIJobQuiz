import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizContext } from '../context/QuizContext'
import { generateNewQuiz } from '../services/aiService'

export function useGenerateNewQuiz() {
  const navigate = useNavigate()
  const { session, replaceCurrentQuiz } = useQuizContext()
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const requestNewQuiz = useCallback(async () => {
    if (!session) return

    setIsLoading(true)
    setHasError(false)

    try {
      const previousQuestions = [...session.quizHistory, ...session.currentQuiz]
      const questions = await generateNewQuiz({
        skills: session.skills,
        previousQuestions,
      })
      replaceCurrentQuiz(questions)
      navigate('/quiz')
    } catch (err) {
      console.error('New quiz generation failed:', err)
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [session, replaceCurrentQuiz, navigate])

  const retry = useCallback(() => {
    void requestNewQuiz()
  }, [requestNewQuiz])

  const cancel = useCallback(() => {
    setHasError(false)
  }, [])

  return { requestNewQuiz, isLoading, hasError, retry, cancel }
}
