import { Link } from 'react-router-dom'
import Card from '../components/Card'

const features = [
  {
    title: 'Role-Aware Skills',
    description:
      'Preview the skills and topics that matter most for your target role before you start practicing.',
  },
  {
    title: 'Tailored Quizzes',
    description:
      'Take focused quizzes designed around real interview expectations for your chosen position.',
  },
  {
    title: 'Actionable Results',
    description:
      'Review your performance with clear breakdowns so you know exactly what to improve next.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="mx-auto max-w-3xl pt-8 text-center sm:pt-16">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          AI-powered interview preparation
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Prepare for your next role with{' '}
          <span className="text-indigo-600">confidence</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          RolePrep AI helps you understand the skills your target role demands, practice with
          tailored quizzes, and track your readiness — all in one place.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/skills"
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            Preview Skills
          </Link>
          <Link
            to="/quiz"
            className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
          >
            Start a Quiz
          </Link>
        </div>
      </section>

      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
