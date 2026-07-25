// AI service — the single entry point for all AI-powered features.

import type { ExtractSkillsAndQuizResponse, QuizQuestion } from '../types'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL = 'gpt-4o-mini'

const SYSTEM_PROMPT = `You are an expert technical recruiter and interview coach.

Analyze the job description provided by the user and:
1. Extract the 8-12 most important skills, tools, technologies, responsibilities, and business concepts.
2. Generate exactly 10 multiple-choice interview questions based on those extracted skills.

Each question must have exactly 4 options. "correctAnswer" must exactly match one of the options. "explanation" must briefly explain why the correct answer is right.

Respond with ONLY valid JSON in exactly this format, with no extra commentary:
{
  "skills": ["Skill 1", "Skill 2"],
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}`

/**
 * Sends the complete job description to the OpenAI API in a single call and
 * returns the extracted skills plus the generated 10-question quiz.
 */
export async function extractSkillsAndQuiz(
  jobDescription: string,
): Promise<ExtractSkillsAndQuizResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      'Missing OpenAI API key. Set VITE_OPENAI_API_KEY in a .env file (see .env.example).',
    )
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: jobDescription },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const content = payload?.choices?.[0]?.message?.content
  if (typeof content !== 'string') {
    throw new Error('OpenAI API returned an unexpected response shape.')
  }

  return parseResponse(content)
}

function parseResponse(content: string): ExtractSkillsAndQuizResponse {
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('OpenAI API returned invalid JSON.')
  }

  const { skills, questions } = (parsed ?? {}) as {
    skills?: unknown
    questions?: unknown
  }

  if (
    !Array.isArray(skills) ||
    !skills.every((skill) => typeof skill === 'string') ||
    !Array.isArray(questions) ||
    !questions.every(isQuizQuestion)
  ) {
    throw new Error('OpenAI API response did not match the expected format.')
  }

  return { skills: skills as string[], questions: questions as QuizQuestion[] }
}

function isQuizQuestion(value: unknown): value is QuizQuestion {
  const question = value as QuizQuestion
  return (
    typeof question?.question === 'string' &&
    Array.isArray(question.options) &&
    question.options.every((option) => typeof option === 'string') &&
    typeof question.correctAnswer === 'string' &&
    typeof question.explanation === 'string'
  )
}
