interface OptionCardProps {
  label: string
  name: string
  isSelected: boolean
  isSubmitted: boolean
  isCorrectOption: boolean
  disabled: boolean
  onSelect: () => void
}

export default function OptionCard({
  label,
  name,
  isSelected,
  isSubmitted,
  isCorrectOption,
  disabled,
  onSelect,
}: OptionCardProps) {
  let cardClasses =
    'flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all duration-200'

  if (!isSubmitted) {
    cardClasses += disabled
      ? ' cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400'
      : ' border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'
  } else if (isSelected && isCorrectOption) {
    cardClasses += ' border-green-500 bg-green-50 text-green-800'
  } else if (isSelected && !isCorrectOption) {
    cardClasses += ' border-red-500 bg-red-50 text-red-800'
  } else {
    cardClasses += ' cursor-default border-slate-200 bg-slate-50 text-slate-400'
  }

  return (
    <label className={cardClasses}>
      <input
        type="radio"
        name={name}
        checked={isSelected}
        disabled={disabled}
        onChange={onSelect}
        className="h-4 w-4 shrink-0 accent-indigo-600 disabled:cursor-not-allowed"
      />
      <span>{label}</span>
    </label>
  )
}
