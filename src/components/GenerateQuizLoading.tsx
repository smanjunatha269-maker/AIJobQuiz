export default function GenerateQuizLoading() {
  return (
    <div
      role="status"
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"
      />
      <div>
        <p className="text-base font-semibold text-slate-900">Generating a fresh quiz...</p>
        <p className="mt-1 text-sm text-slate-500">Preparing new interview questions...</p>
      </div>
    </div>
  )
}
