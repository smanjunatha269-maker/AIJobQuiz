import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { QuizQuestion } from '../types'

export interface QuizSession {
  jobDescription: string
  skills: string[]
  questions: QuizQuestion[]
}

export interface QuizResults {
  score: number
  totalQuestions: number
}

interface QuizContextValue {
  session: QuizSession | null
  results: QuizResults | null
  setSession: (session: QuizSession) => void
  setResults: (results: QuizResults) => void
  clearAll: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<QuizSession | null>(null)
  const [results, setResultsState] = useState<QuizResults | null>(null)

  const setSession = useCallback((next: QuizSession) => {
    setSessionState(next)
    setResultsState(null)
  }, [])

  const setResults = useCallback((next: QuizResults) => {
    setResultsState(next)
  }, [])

  const clearAll = useCallback(() => {
    setSessionState(null)
    setResultsState(null)
  }, [])

  const value = useMemo(
    () => ({ session, results, setSession, setResults, clearAll }),
    [session, results, setSession, setResults, clearAll],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export function useQuizContext(): QuizContextValue {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider')
  }
  return context
}
