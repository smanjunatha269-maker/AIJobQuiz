import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import QuizCard from '../components/QuizCard'
import { useQuizContext } from '../context/QuizContext'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizQuestion } from '../types'

export default function Quiz() {
  const navigate = useNavigate()
  const { session, setResults, quizKey } = useQuizContext()
  const questions = session?.currentQuiz

  const handleComplete = useCallback(
    (score: number) => {
      if (!questions) return
      setResults({ score, totalQuestions: questions.length })
      navigate('/results')
    },
    [navigate, questions, setResults],
  )

  if (!questions || questions.length === 0) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <h1 className="text-lg font-semibold text-slate-900">No quiz available</h1>
        <p className="mt-2 text-sm text-slate-600">
          Submit a job description on the home page to generate a quiz.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Go to Home
        </Link>
      </Card>
    )
  }

  return <QuizContent key={quizKey} questions={questions} onComplete={handleComplete} />
}

interface QuizContentProps {
  questions: QuizQuestion[]
  onComplete: (score: number) => void
}

function QuizContent({ questions, onComplete }: QuizContentProps) {
  const {
    currentIndex,
    currentQuestion,
    totalQuestions,
    selectedOption,
    isSubmitted,
    isCorrect,
    isLastQuestion,
    selectOption,
    goToNext,
  } = useQuiz({ questions, onComplete })

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <Card key={currentQuestion.id}>
        <QuizCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          selectedOption={selectedOption}
          isSubmitted={isSubmitted}
          isCorrect={isCorrect}
          onSelectOption={selectOption}
          onNext={goToNext}
          isLastQuestion={isLastQuestion}
        />
      </Card>
    </div>
  )
}
