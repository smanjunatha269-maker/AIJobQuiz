import { Link, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

interface SkillsPreviewState {
  skills?: string[]
}

export default function SkillsPreview() {
  const location = useLocation()
  const { skills } = (location.state ?? {}) as SkillsPreviewState

  if (!skills || skills.length === 0) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <h1 className="text-lg font-semibold text-slate-900">No skills to show yet</h1>
        <p className="mt-2 text-sm text-slate-600">
          Submit a job description on the home page to extract its key skills.
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

  return (
    <div>
      <PageHeader
        title="Skills Preview"
        description="The key skills we identified in your job description. Your quiz focuses on these areas."
      />

      <Card>
        <h2 className="text-sm font-semibold text-slate-900">Extracted Skills</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
