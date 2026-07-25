/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** OpenAI API key used by src/services/aiService.ts. */
  readonly VITE_OPENAI_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
