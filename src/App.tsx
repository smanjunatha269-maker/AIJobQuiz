import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SkillsPreview from './pages/SkillsPreview'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPreview />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  )
}

export default App
