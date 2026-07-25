import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { extractSkillsAndQuiz } from '../services/aiService'
import type { ExtractSkillsAndQuizResponse } from '../types'

interface SkillsPreviewState {
  jobDescription?: string
}

export default function SkillsPreview() {
  const location = useLocation()
  const navigate = useNavigate()
  const { jobDescription } = (location.state ?? {}) as SkillsPreviewState

  const [data, setData] = useState<ExtractSkillsAndQuizResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobDescription) return

    let cancelled = false
    setIsLoading(true)
    setError(null)

    extractSkillsAndQuiz(jobDescription)
      .then((response) => {
        if (!cancelled) setData(response)
      })
      .catch(() => {
        if (!cancelled) setError('Something went wrong while analyzing the job description.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [jobDescription])

  if (!jobDescription) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <h1 className="text-lg font-semibold text-slate-900">No job description found</h1>
        <p className="mt-2 text-sm text-slate-600">
          Paste a job description on the home page to see the skills it covers.
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
        description="The key skills we identified in your job description. Your quiz will focus on these areas."
      />

      {isLoading && (
        <Card className="flex flex-col items-center gap-4 py-12 text-center">
          <span
            aria-hidden="true"
            className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
          />
          <div>
            <p className="font-medium text-slate-900">Analyzing your job description…</p>
            <p className="mt-1 text-sm text-slate-500">Extracting skills and preparing your quiz.</p>
          </div>
        </Card>
      )}

      {error && (
        <Card className="text-center">
          <p className="font-medium text-red-600">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Try again
          </Link>
        </Card>
      )}

      {data && !isLoading && (
        <>
          <Card>
            <h2 className="text-sm font-semibold text-slate-900">Extracted Skills</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700"
                >
                  {skill.name}
                  <span className="text-xs font-normal text-indigo-400">{skill.level}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                navigate('/quiz', { state: { jobDescription, questions: data.questions } })
              }
              className="rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Start Quiz
            </button>
          </div>
        </>
      )}
    </div>
  )
}
