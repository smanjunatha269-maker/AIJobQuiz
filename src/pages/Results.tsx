import { Link } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

const placeholderStats = [
  { label: 'Score', value: '—' },
  { label: 'Correct Answers', value: '—' },
  { label: 'Time Taken', value: '—' },
]

export default function Results() {
  return (
    <div>
      <PageHeader
        title="Results"
        description="Your quiz performance summary will appear here after completing a quiz."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {placeholderStats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="mx-auto mt-8 max-w-2xl text-center">
        <h2 className="text-lg font-semibold text-slate-900">No results yet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Complete a quiz to see a detailed breakdown of your strengths and areas to improve.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/quiz"
            className="w-full rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            Take a Quiz
          </Link>
          <Link
            to="/"
            className="w-full rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}
