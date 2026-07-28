// Vercel Serverless Function: POST /api/generate-quiz
//
// All LLM logic lives here, server-side. The frontend only sends the job
// description and receives validated, structured JSON — the API key is never
// exposed to the browser.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getOpenRouterModel, logOpenRouterError, OPENROUTER_API_URL } from '../lib/openrouter.js'
import { parseSkillsAndQuizResponse } from '../lib/quizValidation.js'

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

  const { jobDescription } = (req.body ?? {}) as { jobDescription?: unknown }
  if (typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
    return res.status(400).json({ error: 'jobDescription is required.' })
  }

  try {
    const model = getOpenRouterModel()
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: jobDescription },
        ],
      }),
    })

    if (!response.ok) {
      await logOpenRouterError(response, model)
      return res.status(502).json({ error: 'AI request failed. Please try again.' })
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: unknown } }[]
    }
    const content = payload?.choices?.[0]?.message?.content
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'AI returned an unexpected response shape.' })
    }

    const data = parseSkillsAndQuizResponse(content)
    return res.status(200).json(data)
  } catch (err) {
    console.error('Quiz generation failed:', err)
    return res.status(502).json({ error: 'Failed to generate quiz. Please try again.' })
  }
}
