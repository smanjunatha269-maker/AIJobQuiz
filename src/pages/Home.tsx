import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import JobDescriptionForm from '../components/JobDescriptionForm'
import WorkflowInfoCard from '../components/WorkflowInfoCard'
import { useQuizContext } from '../context/QuizContext'
import { extractSkillsAndQuiz } from '../services/aiService'

export default function Home() {
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setSession } = useQuizContext()

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await extractSkillsAndQuiz(jobDescription)
      setSession({
        jobDescription,
        skills: result.skills,
        currentQuiz: result.questions,
        quizHistory: [],
      })
      navigate('/quiz')
    } catch (err) {
      console.error('Quiz generation failed:', err)
      setError('Unable to generate quiz. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
        disabled={isLoading}
      />

      {isLoading && (
        <Card className="flex items-center justify-center gap-3 py-6">
          <span
            aria-hidden="true"
            className="h-6 w-6 shrink-0 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
          />
          <p className="text-sm font-medium text-slate-700">
            Analyzing Job Description and generating interview questions...
          </p>
        </Card>
      )}

      {error && !isLoading && (
        <Card className="border-red-200 bg-red-50 py-4 text-center">
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        </Card>
      )}
    </div>
  )
}
