interface ActionButtonsProps {
  onGenerateNewQuiz: () => void
  onQuit: () => void
}

export default function ActionButtons({ onGenerateNewQuiz, onQuit }: ActionButtonsProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
      <button
        type="button"
        onClick={onGenerateNewQuiz}
        className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
      >
        Generate New Quiz
      </button>
      <button
        type="button"
        onClick={onQuit}
        className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
      >
        Quit
      </button>
    </div>
  )
}
