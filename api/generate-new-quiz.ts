// Vercel Serverless Function: POST /api/generate-new-quiz
//
// Generates a fresh 10-question quiz from existing skills, avoiding questions
// that were already asked in the current session.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { QuizQuestion } from '../src/types'
import { parseQuestionsResponse } from '../lib/quizValidation.js'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_MODEL = 'openai/gpt-4o-mini'

const SYSTEM_PROMPT = `You are an expert technical recruiter and interview coach.

Generate exactly 10 NEW interview questions using ONLY the skills provided by the user.

Rules:
- Target a candidate with approximately 3-5 years of professional experience.
- Mix multiple-choice ("mcq") and true/false ("true_false") questions naturally.
- "mcq" questions must have exactly 4 options.
- "true_false" questions must have exactly 2 options: ["True", "False"].
- "correctAnswer" is the zero-based index of the correct option.
- "id" is a sequential number starting at 1.
- Do NOT repeat or rephrase any question from the previously asked questions list.
- Cover the provided skills evenly across the new questions.

Return ONLY valid JSON in exactly this structure, with no extra commentary:
{
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: 'Server is missing the OPENROUTER_API_KEY environment variable.' })
  }

  const { skills, previousQuestions } = (req.body ?? {}) as {
    skills?: unknown
    previousQuestions?: unknown
  }

  if (!Array.isArray(skills) || skills.length === 0 || !skills.every((s) => typeof s === 'string')) {
    return res.status(400).json({ error: 'skills is required and must be a non-empty string array.' })
  }

  if (previousQuestions !== undefined && !Array.isArray(previousQuestions)) {
    return res.status(400).json({ error: 'previousQuestions must be an array when provided.' })
  }

  const prior = (previousQuestions ?? []) as QuizQuestion[]
  if (!prior.every((q) => typeof q?.question === 'string')) {
    return res.status(400).json({ error: 'previousQuestions contains invalid entries.' })
  }

  const userPayload = JSON.stringify({
    skills,
    previousQuestions: prior.map((q) => ({ id: q.id, type: q.type, question: q.question })),
  })

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPayload },
        ],
      }),
    })

    if (!response.ok) {
      console.error(`OpenRouter request failed with status ${response.status}`)
      return res.status(502).json({ error: 'AI request failed. Please try again.' })
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: unknown } }[]
    }
    const content = payload?.choices?.[0]?.message?.content
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'AI returned an unexpected response shape.' })
    }

    const questions = parseQuestionsResponse(content)
    return res.status(200).json({ questions })
  } catch (err) {
    console.error('New quiz generation failed:', err)
    return res.status(502).json({ error: 'Failed to generate quiz. Please try again.' })
  }
}
