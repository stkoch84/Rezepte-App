import { useParams, Link } from 'react-router-dom'
import recipes from '../data/recipes.json'
import { Clock, Users, Star, ArrowLeft, Heart, ChefHat } from 'lucide-react'

export default function RecipeDetail() {
  const { id } = useParams()
  const recipe = recipes.find(r => r.id === id)

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500 text-lg">Rezept nicht gefunden.</p>
        <Link to="/" className="text-amber-600 hover:underline mt-4 inline-block">← Zurück zur Übersicht</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-6 text-sm">
        <ArrowLeft size={16} />
        Zurück zur Übersicht
      </Link>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-64 sm:h-80">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          {recipe.favorite && (
            <span className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Heart size={20} className="text-rose-500 fill-rose-500" />
            </span>
          )}
          <span className="absolute top-4 left-4 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">{recipe.title}</h1>
          <p className="text-stone-500 mb-6">{recipe.description}</p>

          <div className="flex flex-wrap gap-4 py-4 border-y border-stone-100 mb-6">
            <div className="flex items-center gap-2 text-stone-600">
              <Clock size={18} className="text-amber-500" />
              <div>
                <p className="text-xs text-stone-400">Gesamt</p>
                <p className="font-medium text-sm">{recipe.prepTime + recipe.cookTime} Min</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <ChefHat size={18} className="text-amber-500" />
              <div>
                <p className="text-xs text-stone-400">Vorbereitung</p>
                <p className="font-medium text-sm">{recipe.prepTime} Min</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <Users size={18} className="text-amber-500" />
              <div>
                <p className="text-xs text-stone-400">Portionen</p>
                <p className="font-medium text-sm">{recipe.servings} Pers.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < recipe.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {recipe.tags.map(tag => (
              <span key={tag} className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full border border-amber-200">
                #{tag}
              </span>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Zutaten</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-baseline gap-2 py-2 border-b border-stone-50 last:border-0">
                    <span className="font-medium text-stone-700 text-sm min-w-[80px]">
                      {ing.amount} {ing.unit}
                    </span>
                    <span className="text-stone-600 text-sm">{ing.name}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Zubereitung</h2>
              <ol className="space-y-4">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-stone-600 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {recipe.notes && (
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-800 mb-1">Tipp</p>
              <p className="text-sm text-amber-700">{recipe.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
