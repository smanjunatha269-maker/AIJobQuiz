import { Link, useNavigate } from 'react-router-dom'
import ActionButtons from '../components/ActionButtons'
import Card from '../components/Card'
import ResultsCard from '../components/ResultsCard'
import SkillsChips from '../components/SkillsChips'
import { useQuizContext } from '../context/QuizContext'

export default function Results() {
  const navigate = useNavigate()
  const { session, results, clearAll } = useQuizContext()

  const handleGenerateNewQuiz = () => {
    navigate('/quiz')
  }

  const handleQuit = () => {
    clearAll()
    navigate('/')
  }

  if (!session || !results) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <h1 className="text-lg font-semibold text-slate-900">No results yet</h1>
        <p className="mt-2 text-sm text-slate-600">
          Complete a quiz to see your performance summary.
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

  const { skills } = session
  const { score, totalQuestions } = results

  return (
    <div className="animate-fade-in mx-auto flex min-h-[60vh] w-full max-w-[700px] flex-col items-center justify-center px-4 py-10">
      <div className="flex w-full flex-col items-center gap-8">
        <div className="text-center">
          <div
            aria-hidden="true"
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
          >
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Quiz Completed</h1>
          <p className="mt-2 text-base text-slate-600">
            Great job! Here&apos;s how you performed.
          </p>
        </div>

        <div className="w-full">
          <ResultsCard score={score} totalQuestions={totalQuestions} />
        </div>

        <div className="w-full">
          <SkillsChips skills={skills} />
        </div>

        <ActionButtons onGenerateNewQuiz={handleGenerateNewQuiz} onQuit={handleQuit} />
      </div>
    </div>
  )
}
