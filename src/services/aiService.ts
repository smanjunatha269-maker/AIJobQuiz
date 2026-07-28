// AI service layer — the single entry point for all AI-powered features.
//
// The UI never talks to the LLM directly; it only calls the functions exported
// here and consumes their typed results. To switch to another model or
// provider, change this file only — the request/prompt/validation details are
// fully encapsulated.

import type { ExtractSkillsAndQuizResponse, QuizQuestion } from '../types'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL = 'gpt-4o-mini'

const SYSTEM_PROMPT = `You are an expert technical recruiter and interview coach.

Analyze the job description provided by the user and:
1. Extract the most important skills, tools, technologies, responsibilities, and business concepts.
2. Generate exactly 10 interview questions based on those extracted skills.

Rules for the questions:
- Target a candidate with approximately 3-5 years of professional experience.
- Mix multiple-choice ("mcq") and true/false ("true_false") questions naturally.
- "mcq" questions must have exactly 4 options.
- "true_false" questions must have exactly 2 options: ["True", "False"].
- "correctAnswer" is the zero-based index of the correct option.
- "id" is a sequential number starting at 1.

Return ONLY valid JSON in exactly this structure, with no extra commentary:
{
  "skills": ["Skill 1", "Skill 2"],
  "questions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": 2
    },
    {
      "id": 2,
      "type": "true_false",
      "question": "",
      "options": ["True", "False"],
      "correctAnswer": 0
    }
  ]
}`

/**
 * Sends the complete job description to the AI model in a single request and
 * returns the extracted skills plus the generated 10-question quiz.
 *
 * Throws if the request fails or the response is not valid; callers should
 * catch and show a friendly error message.
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
    skills.length === 0 ||
    !skills.every((skill) => typeof skill === 'string') ||
    !Array.isArray(questions) ||
    questions.length === 0 ||
    !questions.every(isQuizQuestion)
  ) {
    throw new Error('OpenAI API response did not match the expected format.')
  }

  return { skills: skills as string[], questions: questions as QuizQuestion[] }
}

function isQuizQuestion(value: unknown): value is QuizQuestion {
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
