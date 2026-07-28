import type { QuizQuestion } from '../types'
import OptionCard from './OptionCard'
import ProgressBar from './ProgressBar'

interface QuizCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  isSubmitted: boolean
  isCorrect: boolean
  onSelectOption: (index: number) => void
  onNext: () => void
  isLastQuestion: boolean
}

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isSubmitted,
  isCorrect,
  onSelectOption,
  onNext,
  isLastQuestion,
}: QuizCardProps) {
  const radioGroupName = `question-${question.id}`

  return (
    <div className="transition-opacity duration-300">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-slate-600">
          <span>
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <ProgressBar current={questionNumber} total={totalQuestions} />
      </div>

      <h2 className="text-lg font-semibold leading-relaxed text-slate-900">{question.question}</h2>

      <fieldset className="mt-6 space-y-3" disabled={isSubmitted}>
        <legend className="sr-only">Select an answer</legend>
        {question.options.map((option, index) => (
          <OptionCard
            key={index}
            label={option}
            name={radioGroupName}
            isSelected={selectedOption === index}
            isSubmitted={isSubmitted}
            isCorrectOption={index === question.correctAnswer}
            disabled={isSubmitted}
            onSelect={() => onSelectOption(index)}
          />
        ))}
      </fieldset>

      {isSubmitted && (
        <p
          role="status"
          className={`mt-6 text-center text-base font-semibold ${
            isCorrect ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isCorrect ? '✅ Correct' : '❌ Incorrect'}
        </p>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!isSubmitted}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  )
}
