import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { QuizQuestion } from '../types'

export interface QuizSession {
  jobDescription: string
  skills: string[]
  /** All questions from previously completed quizzes in this session. */
  quizHistory: QuizQuestion[]
  /** The active quiz the user is taking or about to take. */
  currentQuiz: QuizQuestion[]
}

export interface QuizResults {
  score: number
  totalQuestions: number
}

interface QuizContextValue {
  session: QuizSession | null
  results: QuizResults | null
  /** Increments when the active quiz is replaced so the Quiz page remounts fresh. */
  quizKey: number
  setSession: (session: QuizSession) => void
  setResults: (results: QuizResults) => void
  replaceCurrentQuiz: (questions: QuizQuestion[]) => void
  clearResults: () => void
  clearAll: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<QuizSession | null>(null)
  const [results, setResultsState] = useState<QuizResults | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  const setSession = useCallback((next: QuizSession) => {
    setSessionState(next)
    setResultsState(null)
    setQuizKey((key) => key + 1)
  }, [])

  const setResults = useCallback((next: QuizResults) => {
    setResultsState(next)
  }, [])

  const clearResults = useCallback(() => {
    setResultsState(null)
  }, [])

  const replaceCurrentQuiz = useCallback((questions: QuizQuestion[]) => {
    setSessionState((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        quizHistory: [...prev.quizHistory, ...prev.currentQuiz],
        currentQuiz: questions,
      }
    })
    setResultsState(null)
    setQuizKey((key) => key + 1)
  }, [])

  const clearAll = useCallback(() => {
    setSessionState(null)
    setResultsState(null)
    setQuizKey(0)
  }, [])

  const value = useMemo(
    () => ({
      session,
      results,
      quizKey,
      setSession,
      setResults,
      replaceCurrentQuiz,
      clearResults,
      clearAll,
    }),
    [session, results, quizKey, setSession, setResults, replaceCurrentQuiz, clearResults, clearAll],
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
