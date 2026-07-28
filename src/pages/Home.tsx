import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JobDescriptionForm from '../components/JobDescriptionForm'
import WorkflowInfoCard from '../components/WorkflowInfoCard'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/skills', { state: { jobDescription } })
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 pt-6 sm:pt-12">
      <section className="text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          AI-powered interview preparation
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          InterviewPrep <span className="text-indigo-600">AI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Upload a Job Description and generate an AI-powered interview quiz.
        </p>
      </section>

      <WorkflowInfoCard />

      <JobDescriptionForm
        value={jobDescription}
        onChange={setJobDescription}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
