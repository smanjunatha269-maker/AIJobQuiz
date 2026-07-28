import Card from './Card'
import { countWords } from '../utils'

interface JobDescriptionFormProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  maxWords?: number
}

export default function JobDescriptionForm({
  value,
  onChange,
  onSubmit,
  maxWords = 3000,
}: JobDescriptionFormProps) {
  const wordCount = countWords(value)
  const isEmpty = wordCount === 0
  const isOverLimit = wordCount > maxWords
  const canSubmit = !isEmpty && !isOverLimit

  return (
    <Card>
      <label htmlFor="job-description" className="block text-sm font-semibold text-slate-900">
        Job Description
      </label>
      <p className="mt-1 text-sm text-slate-500">
        Paste the job description you want to prepare for.
      </p>

      <textarea
        id="job-description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the job description here…"
        rows={12}
        className="mt-4 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />

      <div className="mt-3 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <span
            className={`text-sm font-medium tabular-nums ${
              isOverLimit ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
          </span>
          {isOverLimit && (
            <p role="alert" className="mt-1 text-sm font-medium text-red-600">
              Maximum {maxWords.toLocaleString()} words allowed.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Submit
        </button>
      </div>
    </Card>
  )
}
