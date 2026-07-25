// Quiz service — API calls and AI integration will live here.
// No business logic is implemented yet.

import type { QuizQuestion, QuizResult, Skill } from '../types'

export async function fetchSkills(): Promise<Skill[]> {
  // TODO: fetch role-specific skills from the AI backend.
  return []
}

export async function fetchQuizQuestions(): Promise<QuizQuestion[]> {
  // TODO: generate quiz questions via the AI backend.
  return []
}

export async function submitQuiz(): Promise<QuizResult | null> {
  // TODO: submit answers and compute results.
  return null
}
