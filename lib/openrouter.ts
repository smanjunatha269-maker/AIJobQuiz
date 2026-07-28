export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export function getOpenRouterModel(): string {
  return process.env.OPENROUTER_MODEL ?? 'nvidia/nemotron-3-ultra-550b-a55b:free'
}

export async function logOpenRouterError(response: Response, model: string): Promise<void> {
  const errorBody = await response.text()
  console.error('OpenRouter Error', {
    status: response.status,
    statusText: response.statusText,
    model,
    body: errorBody,
  })
}
