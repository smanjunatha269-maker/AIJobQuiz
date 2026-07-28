// Shared utility functions.

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (trimmed.length === 0) return 0
  return trimmed.split(/\s+/).length
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}
