import { Clock, Users, Star, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <Link to={`/rezept/${recipe.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="relative overflow-hidden h-48">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {recipe.favorite && (
            <span className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow">
              <Heart size={16} className="text-rose-500 fill-rose-500" />
            </span>
          )}
          <span className="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded-full">
            {recipe.category}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-semibold text-stone-800 text-lg leading-tight mb-1 group-hover:text-amber-700 transition-colors">
            {recipe.title}
          </h2>
          <p className="text-stone-500 text-sm line-clamp-2 mb-4 flex-1">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-stone-400 text-sm pt-3 border-t border-stone-100">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {totalTime} Min
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {recipe.servings} Pers.
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < recipe.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
