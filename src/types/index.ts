// Shared type definitions for RolePrep AI.
// These will grow as quiz generation and AI integration are implemented.

export interface Skill {
  id: string
  name: string
  level: 'Fundamental' | 'Intermediate' | 'Advanced'
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  correctOptionIndex: number
}

export interface ExtractSkillsAndQuizResponse {
  skills: Skill[]
  questions: QuizQuestion[]
}

export interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  completedAt: string
}
