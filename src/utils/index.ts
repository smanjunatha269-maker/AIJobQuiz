// Shared utility functions will live here.
// No business logic is implemented yet.

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}
