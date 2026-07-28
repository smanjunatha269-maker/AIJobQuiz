interface SkillsChipsProps {
  skills: string[]
  heading?: string
}

export default function SkillsChips({ skills, heading = 'Skills Identified' }: SkillsChipsProps) {
  if (skills.length === 0) return null

  return (
    <div>
      <h2 className="text-center text-sm font-semibold text-slate-900">{heading}</h2>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
