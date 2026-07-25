// AI service — the single entry point for all AI-powered features.
//
// This module is structured for a future OpenAI integration: callers depend
// only on `extractSkillsAndQuiz` and its typed response, so swapping the
// placeholder below for a real API call requires no changes elsewhere.

import type { ExtractSkillsAndQuizResponse } from '../types'
import { mockQuizQuestions, mockSkills } from './mockData'

const SIMULATED_LATENCY_MS = 1200

/**
 * Extracts the key skills from a job description and generates a quiz for them.
 *
 * TODO(openai): replace the placeholder below with a real OpenAI call, e.g.
 *   1. Build a prompt from `jobDescription` asking for skills + quiz questions
 *      as structured JSON matching `ExtractSkillsAndQuizResponse`.
 *   2. Call the chat completions endpoint (via a backend proxy so the API key
 *      is never exposed to the browser).
 *   3. Validate and return the parsed response.
 */
export function extractSkillsAndQuiz(
  jobDescription: string,
): Promise<ExtractSkillsAndQuizResponse> {
  void jobDescription // Unused until the real API call is implemented.

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ skills: mockSkills, questions: mockQuizQuestions })
    }, SIMULATED_LATENCY_MS)
  })
}
