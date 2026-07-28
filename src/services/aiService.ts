// AI service layer — the single entry point for all AI-powered features.
//
// The UI never talks to the LLM directly. This module calls our own backend
// (a Vercel Serverless Function at /api/generate-quiz), which holds the API
// key and all prompt/model logic. Swapping models or providers only requires
// changing the serverless function — the UI and this interface stay the same.

import type { ExtractSkillsAndQuizResponse } from '../types'

/**
 * Sends the complete job description to the backend, which makes a single AI
 * request and returns the extracted skills plus the generated 10-question quiz.
 *
 * Throws if the request fails or the response is not valid; callers should
 * catch and show a friendly error message.
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
