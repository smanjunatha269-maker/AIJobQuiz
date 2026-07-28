interface GenerateQuizErrorProps {
  onRetry: () => void
  onCancel: () => void
  disabled?: boolean
}

export default function GenerateQuizError({
  onRetry,
  onCancel,
  disabled = false,
}: GenerateQuizErrorProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
      <p className="text-base font-semibold text-red-800">Unable to generate a new quiz.</p>
      <p className="mt-1 text-sm text-red-600">Please try again.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onRetry}
          disabled={disabled}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Retry
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled}
          className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
