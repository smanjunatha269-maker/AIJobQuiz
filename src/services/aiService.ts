// AI service layer — the single entry point for all AI-powered features.
//
// The UI never talks to the LLM directly. This module calls our own backend
// (Vercel Serverless Functions), which hold the API key and all prompt/model
// logic. Swapping models or providers only requires changing the serverless
// functions — the UI and this interface stay the same.

import type {
  ExtractSkillsAndQuizResponse,
  GenerateNewQuizResponse,
  QuizQuestion,
} from '../types'

/**
 * Sends the complete job description to the backend, which makes a single AI
 * request and returns the extracted skills plus the generated 10-question quiz.
 */
export async function extractSkillsAndQuiz(
  jobDescription: string,
): Promise<ExtractSkillsAndQuizResponse> {
  const response = await fetch('/api/generate-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription }),
  })

  if (!response.ok) {
    throw new Error(`Quiz generation request failed with status ${response.status}`)
  }

  const data = (await response.json()) as ExtractSkillsAndQuizResponse
  if (!Array.isArray(data?.skills) || !Array.isArray(data?.questions)) {
    throw new Error('Quiz generation returned an unexpected response.')
  }

  return data
}

/**
 * Generates a fresh 10-question quiz from existing skills, avoiding questions
 * that were already asked in the current session.
 */
export async function generateNewQuiz(params: {
  skills: string[]
  previousQuestions: QuizQuestion[]
}): Promise<QuizQuestion[]> {
  const response = await fetch('/api/generate-new-quiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error(`New quiz generation request failed with status ${response.status}`)
  }

  const data = (await response.json()) as GenerateNewQuizResponse
  if (!Array.isArray(data?.questions)) {
    throw new Error('New quiz generation returned an unexpected response.')
  }

  return data.questions
}
