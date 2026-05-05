import { createContext, useContext, useState } from 'react'
import staticRecipes from '../data/recipes.json'

const RecipesContext = createContext(null)

const STORAGE_KEY = 'rezepte-app-custom'

function loadCustom() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function RecipesProvider({ children }) {
  const [custom, setCustom] = useState(loadCustom)

  const recipes = [...staticRecipes, ...custom]

  function addRecipe(recipe) {
    const updated = [recipe, ...custom]
    setCustom(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function deleteRecipe(id) {
    const updated = custom.filter(r => r.id !== id)
    setCustom(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <RecipesContext.Provider value={{ recipes, addRecipe, deleteRecipe }}>
      {children}
    </RecipesContext.Provider>
  )
}

export function useRecipes() {
  return useContext(RecipesContext)
}
