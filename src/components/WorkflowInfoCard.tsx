import Card from './Card'

const workflowSteps = [
  'Paste or upload a Job Description.',
  'Maximum 3000 words.',
  'AI extracts the required skills.',
  'AI generates 10 interview questions.',
  'Take the quiz and receive your score.',
  'Generate a fresh quiz without uploading the JD again.',
]

export default function WorkflowInfoCard() {
  return (
    <Card>
      <h2 className="text-sm font-semibold text-slate-900">How it works</h2>
      <ul className="mt-3 space-y-2">
        {workflowSteps.map((step) => (
          <li key={step} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
            {step}
          </li>
        ))}
      </ul>
    </Card>
  )
}
