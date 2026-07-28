import { useCallback, useState } from 'react'
import type { QuizQuestion } from '../types'

interface UseQuizOptions {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
}

export function useQuiz({ questions, onComplete }: UseQuizOptions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const totalQuestions = questions.length
  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === totalQuestions - 1

  const isCorrect =
    isSubmitted && selectedOption !== null && selectedOption === currentQuestion.correctAnswer

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (isSubmitted) return

      setSelectedOption(optionIndex)
      setIsSubmitted(true)

      if (optionIndex === currentQuestion.correctAnswer) {
        setScore((prev) => prev + 1)
      }
    },
    [isSubmitted, currentQuestion.correctAnswer],
  )

  const goToNext = useCallback(() => {
    if (!isSubmitted) return

    if (isLastQuestion) {
      onComplete(score)
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedOption(null)
    setIsSubmitted(false)
  }, [isSubmitted, isLastQuestion, onComplete, score])

  return {
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedOption,
    isSubmitted,
    isCorrect,
    isLastQuestion,
    selectOption,
    goToNext,
  }
}
