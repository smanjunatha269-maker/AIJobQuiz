import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import { mockSkills } from '../services/mockData'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('')
  const navigate = useNavigate()

  const isEmpty = jobDescription.trim().length === 0

  const handleGenerateQuiz = () => {
    if (isEmpty) return
    // AI integration is not implemented yet — pass mock skills to the preview page.
    navigate('/skills', {
      state: { jobDescription, skills: mockSkills },
    })
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 pt-6 sm:pt-12">
      <section className="text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          AI-powered interview preparation
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          RolePrep <span className="text-indigo-600">AI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Turn any Job Description into an Interview Quiz.
        </p>
      </section>

      <Card>
        <label htmlFor="job-description" className="block text-sm font-semibold text-slate-900">
          Job Description
        </label>
        <p className="mt-1 text-sm text-slate-500">
          Paste the job description you want to prepare for.
        </p>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the job description here…"
          rows={12}
          className="mt-4 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />

        <div className="mt-3 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <span className="text-sm tabular-nums text-slate-500">
            {jobDescription.length.toLocaleString()}{' '}
            {jobDescription.length === 1 ? 'character' : 'characters'}
          </span>
          <button
            type="button"
            onClick={handleGenerateQuiz}
            disabled={isEmpty}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Generate Quiz
          </button>
        </div>
      </Card>
    </div>
  )
}
