// Temporary mock data returned by the aiService placeholder until the real
// OpenAI integration is implemented.

import type { QuizQuestion, Skill } from '../types'

export const mockSkills: Skill[] = [
  { id: 'react', name: 'React', level: 'Advanced' },
  { id: 'typescript', name: 'TypeScript', level: 'Advanced' },
  { id: 'state-management', name: 'State Management', level: 'Intermediate' },
  { id: 'rest-apis', name: 'REST APIs', level: 'Intermediate' },
  { id: 'testing', name: 'Testing', level: 'Intermediate' },
  { id: 'css-tailwind', name: 'CSS & Tailwind', level: 'Fundamental' },
  { id: 'git-workflow', name: 'Git Workflow', level: 'Fundamental' },
  { id: 'communication', name: 'Communication', level: 'Fundamental' },
]

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Placeholder question 1 — real questions will be generated from the job description.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOptionIndex: 0,
  },
  {
    id: 'q2',
    prompt: 'Placeholder question 2 — real questions will be generated from the job description.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOptionIndex: 1,
  },
  {
    id: 'q3',
    prompt: 'Placeholder question 3 — real questions will be generated from the job description.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOptionIndex: 2,
  },
]
