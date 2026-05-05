import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecipesProvider } from './context/RecipesContext'
import RecipeList from './pages/RecipeList'
import RecipeDetail from './pages/RecipeDetail'
import RecipeForm from './pages/RecipeForm'

export default function App() {
  return (
    <BrowserRouter basename="/Rezepte-App">
      <RecipesProvider>
        <div className="min-h-screen bg-amber-50">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/rezept/:id" element={<RecipeDetail />} />
            <Route path="/neu" element={<RecipeForm />} />
          </Routes>
        </div>
      </RecipesProvider>
    </BrowserRouter>
  )
}
