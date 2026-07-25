# RolePrep AI

AI-powered interview preparation. Preview the skills your target role demands, practice with tailored quizzes, and track your readiness.

Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Getting Started

```bash
npm install
cp .env.example .env   # then add your OpenAI API key
npm run dev
```

Then open http://localhost:5173 in your browser.

### Environment Variables

| Variable              | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `VITE_OPENAI_API_KEY` | OpenAI API key used to analyze job descriptions and generate quizzes |

> Security note: Vite exposes `VITE_`-prefixed variables to the browser. Use a key with a spend limit for local development, and proxy the OpenAI call through a backend before deploying publicly.

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
src/
  components/   Shared UI components (layout, navbar, cards)
  pages/        Route-level page components
  services/     AI integration (OpenAI-powered skill extraction and quiz generation)
  hooks/        Custom React hooks
  utils/        Shared utility functions
  types/        Shared TypeScript types
```
