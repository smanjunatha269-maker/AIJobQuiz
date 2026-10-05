import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { QuizProvider } from './context/QuizContext'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </QuizProvider>
  )
}

export default App
