import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-amber-50">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/rezept/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
