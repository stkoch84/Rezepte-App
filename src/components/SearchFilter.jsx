import { Search, X } from 'lucide-react'

const CATEGORIES = ['Alle', 'Pasta', 'Frühstück', 'Suppen', 'Backen']

export default function SearchFilter({ search, setSearch, category, setCategory, showFavorites, setShowFavorites }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Rezepte suchen…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 bg-white rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-amber-500 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300'
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            showFavorites
              ? 'bg-rose-500 text-white'
              : 'bg-white text-stone-600 border border-stone-200 hover:border-rose-300'
          }`}
        >
          ♥ Favoriten
        </button>
      </div>
    </div>
  )
}
