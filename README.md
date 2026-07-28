# InterviewPrep AI

AI-powered interview preparation. Preview the skills your target role demands, practice with tailored quizzes, and track your readiness.

Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Getting Started

Quiz generation runs through a Vercel Serverless Function (`api/generate-quiz.ts`), so local development uses the Vercel CLI to serve both the frontend and the API:

```bash
npm install
cp .env.example .env    # then add your OpenRouter API key
npx vercel dev
```

Running `npm run dev` alone starts the Vite frontend only — `/api/generate-quiz` will not be available.

### Environment Variables

Set these in your `.env` file (local) or in the Vercel project's Environment Variables settings (production):

```
OPENROUTER_API_KEY=<your_api_key>
OPENROUTER_MODEL=nvidia/nemotron-3-ultra-550b-a55b:free
```

| Variable             | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `OPENROUTER_API_KEY` | OpenRouter API key used server-side by the quiz-generation serverless functions |
| `OPENROUTER_MODEL`   | OpenRouter model identifier (defaults to `nvidia/nemotron-3-ultra-550b-a55b:free` if unset) |

These are read from `process.env` inside the serverless functions and are never exposed to the browser.

## Deployment

The project deploys to Vercel out of the box: the Vite app is served statically, `api/` becomes serverless functions, and `vercel.json` rewrites all non-API routes to `index.html` so React Router deep links work.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the development server       |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run the linter                     |

## Pages

- `/` — Home
- `/skills` — Skills Preview
- `/quiz` — Quiz
- `/results` — Results

## Project Structure

```
api/
  generate-quiz.ts   Vercel Serverless Function with all LLM logic (OpenRouter)
src/
  components/   Shared UI components (layout, navbar, cards)
  pages/        Route-level page components
  services/     AI service layer (calls /api/generate-quiz — never the LLM directly)
  hooks/        Custom React hooks
  utils/        Shared utility functions
  types/        Shared TypeScript types
```
