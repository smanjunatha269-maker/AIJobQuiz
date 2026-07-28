import type { ExtractSkillsAndQuizResponse, QuizQuestion } from '../src/types'

export function isQuizQuestion(value: unknown): value is QuizQuestion {
  const question = value as QuizQuestion
  if (
    typeof question?.id !== 'number' ||
    (question.type !== 'mcq' && question.type !== 'true_false') ||
    typeof question.question !== 'string' ||
    !Array.isArray(question.options) ||
    !question.options.every((option) => typeof option === 'string') ||
    typeof question.correctAnswer !== 'number'
  ) {
    return false
  }

  const expectedOptionCount = question.type === 'mcq' ? 4 : 2
  return (
    question.options.length === expectedOptionCount &&
    Number.isInteger(question.correctAnswer) &&
    question.correctAnswer >= 0 &&
    question.correctAnswer < question.options.length
  )
}

export function parseSkillsAndQuizResponse(content: string): ExtractSkillsAndQuizResponse {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('AI returned invalid JSON.')
  }

  const { skills, questions } = (parsed ?? {}) as {
    skills?: unknown
    questions?: unknown
  }

  if (
    !Array.isArray(skills) ||
    skills.length === 0 ||
    !skills.every((skill) => typeof skill === 'string') ||
    !Array.isArray(questions) ||
    questions.length === 0 ||
    !questions.every(isQuizQuestion)
  ) {
    throw new Error('AI response did not match the expected format.')
  }

  return { skills: skills as string[], questions: questions as QuizQuestion[] }
}

export function parseQuestionsResponse(content: string): QuizQuestion[] {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('AI returned invalid JSON.')
  }

  const { questions } = (parsed ?? {}) as { questions?: unknown }

  if (
    !Array.isArray(questions) ||
    questions.length === 0 ||
    !questions.every(isQuizQuestion)
  ) {
    throw new Error('AI response did not match the expected format.')
  }

  return questions as QuizQuestion[]
}
