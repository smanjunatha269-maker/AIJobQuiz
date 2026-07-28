interface ResultsCardProps {
  score: number
  totalQuestions: number
}

export default function ResultsCard({ score, totalQuestions }: ResultsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
      <p className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
        {score} / {totalQuestions}
      </p>
      <p className="mt-4 text-base text-slate-600">
        You answered {score} out of {totalQuestions} questions correctly.
      </p>
    </div>
  )
}
