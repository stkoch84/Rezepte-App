import { useState, useMemo } from 'react'
import recipes from '../data/recipes.json'
import RecipeCard from '../components/RecipeCard'
import SearchFilter from '../components/SearchFilter'
import { ChefHat } from 'lucide-react'

export default function RecipeList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Alle')
  const [showFavorites, setShowFavorites] = useState(false)

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch =
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Alle' || r.category === category
      const matchesFavorite = !showFavorites || r.favorite
      return matchesSearch && matchesCategory && matchesFavorite
    })
  }, [search, category, showFavorites])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ChefHat size={32} className="text-amber-500" />
          <h1 className="text-3xl font-bold text-stone-800">Meine Rezepte</h1>
        </div>
        <p className="text-stone-500">{recipes.length} Rezepte gesammelt</p>
      </header>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-stone-400">
          <p className="text-lg">Kein Rezept gefunden.</p>
          <p className="text-sm mt-1">Versuch einen anderen Suchbegriff.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}
