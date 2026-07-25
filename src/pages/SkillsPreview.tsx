import { Link } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'

const placeholderSkills = [
  { name: 'Core Concepts', level: 'Fundamental' },
  { name: 'Problem Solving', level: 'Intermediate' },
  { name: 'System Design', level: 'Advanced' },
  { name: 'Communication', level: 'Fundamental' },
  { name: 'Tooling & Workflow', level: 'Intermediate' },
  { name: 'Best Practices', level: 'Intermediate' },
]

export default function SkillsPreview() {
  return (
    <div>
      <PageHeader
        title="Skills Preview"
        description="A snapshot of the skill areas your target role is likely to cover. Personalized, AI-generated skill maps are coming soon."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderSkills.map((skill) => (
          <Card key={skill.name} className="flex items-center justify-between">
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
