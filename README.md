# RolePrep AI

AI-powered interview preparation. Preview the skills your target role demands, practice with tailored quizzes, and track your readiness.

Built with React, TypeScript, Vite, Tailwind CSS, and React Router.

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

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
  services/     API and AI integration (stubs for now)
  hooks/        Custom React hooks (stubs for now)
  utils/        Shared utility functions
  types/        Shared TypeScript types
```

> Note: Business logic and AI integration are not implemented yet — the UI is scaffolded with placeholder content.
