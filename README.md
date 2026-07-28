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

| Variable             | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `OPENROUTER_API_KEY` | OpenRouter API key used server-side by the quiz-generation serverless function |

The key is read from `process.env` inside the serverless function and is never exposed to the browser. For Vercel deployments, set it in the project's Environment Variables settings.

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
