import { Link } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

export default function Quiz() {
  return (
    <div>
      <PageHeader
        title="Quiz"
        description="Answer role-specific questions to gauge your readiness. Question generation will be powered by AI in an upcoming release."
      />

      <Card className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Question 1 of 10</span>
          <span>Placeholder</span>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">
          Sample question will appear here once quiz generation is connected.
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {['Option A', 'Option B', 'Option C', 'Option D'].map((option) => (
            <button
              key={option}
              type="button"
              className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            to="/skills"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Back to Skills
          </Link>
          <Link
            to="/results"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Finish Quiz
          </Link>
        </div>
      </Card>
    </div>
  )
}
