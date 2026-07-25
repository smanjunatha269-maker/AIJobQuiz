import { Link, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { mockSkills } from '../services/mockData'
import type { Skill } from '../types'

interface SkillsPreviewState {
  jobDescription?: string
  skills?: Skill[]
}

export default function SkillsPreview() {
  const location = useLocation()
  const state = (location.state ?? {}) as SkillsPreviewState
  const skills = state.skills ?? mockSkills

  return (
    <div>
      <PageHeader
        title="Skills Preview"
        description="A snapshot of the skill areas your target role is likely to cover. Personalized, AI-generated skill maps are coming soon."
      />

      {state.jobDescription && (
        <Card className="mb-6">
          <h2 className="text-sm font-semibold text-slate-900">Your Job Description</h2>
          <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            {state.jobDescription}
          </p>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <Card key={skill.id} className="flex items-center justify-between">
            <span className="font-medium text-slate-900">{skill.name}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {skill.level}
            </span>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/quiz"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Continue to Quiz
        </Link>
      </div>
    </div>
  )
}
