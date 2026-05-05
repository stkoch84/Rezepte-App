import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipesContext'
import { Plus, Trash2, ArrowLeft, Star } from 'lucide-react'

const CATEGORIES = ['Pasta', 'Frühstück', 'Suppen', 'Backen', 'Salate', 'Fleisch', 'Vegetarisch', 'Dessert', 'Sonstiges']

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const emptyIngredient = () => ({ amount: '', unit: '', name: '' })
const emptyStep = () => ({ text: '' })

export default function RecipeForm() {
  const { addRecipe } = useRecipes()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState(4)
  const [prepTime, setPrepTime] = useState(15)
  const [cookTime, setCookTime] = useState(30)
  const [rating, setRating] = useState(4)
  const [hoverRating, setHoverRating] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [ingredients, setIngredients] = useState([emptyIngredient()])
  const [steps, setSteps] = useState([emptyStep()])
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!title.trim()) e.title = 'Bitte einen Titel eingeben.'
    if (!description.trim()) e.description = 'Bitte eine kurze Beschreibung eingeben.'
    if (ingredients.every(i => !i.name.trim())) e.ingredients = 'Mindestens eine Zutat angeben.'
    if (steps.every(s => !s.text.trim())) e.steps = 'Mindestens einen Schritt angeben.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const recipe = {
      id: slugify(title) + '-' + Date.now(),
      title: title.trim(),
      category,
      description: description.trim(),
      servings: Number(servings),
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      rating,
      favorite,
      image: image.trim() || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      notes: notes.trim(),
      ingredients: ingredients.filter(i => i.name.trim()),
      steps: steps.filter(s => s.text.trim()).map(s => s.text.trim()),
    }

    addRecipe(recipe)
    navigate(`/rezept/${recipe.id}`)
  }

  function updateIngredient(idx, field, value) {
    setIngredients(prev => prev.map((ing, i) => i === idx ? { ...ing, [field]: value } : ing))
  }

  function addIngredient() {
    setIngredients(prev => [...prev, emptyIngredient()])
  }

  function removeIngredient(idx) {
    setIngredients(prev => prev.filter((_, i) => i !== idx))
  }

  function updateStep(idx, value) {
    setSteps(prev => prev.map((s, i) => i === idx ? { text: value } : s))
  }

  function addStep() {
    setSteps(prev => [...prev, emptyStep()])
  }

  function removeStep(idx) {
    setSteps(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-6 text-sm">
        <ArrowLeft size={16} />
        Zurück zur Übersicht
      </Link>

      <h1 className="text-2xl font-bold text-stone-800 mb-8">Neues Rezept hinzufügen</h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Grunddaten */}
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="font-semibold text-stone-700">Grunddaten</h2>

          <Field label="Titel *" error={errors.title}>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="z. B. Spaghetti Carbonara"
              className={input(errors.title)}
            />
          </Field>

          <Field label="Kategorie">
            <select value={category} onChange={e => setCategory(e.target.value)} className={input()}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Kurzbeschreibung *" error={errors.description}>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Ein paar Sätze, was das Rezept besonders macht…"
              rows={2}
              className={input(errors.description) + ' resize-none'}
            />
          </Field>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Portionen">
              <input type="number" min={1} value={servings} onChange={e => setServings(e.target.value)} className={input()} />
            </Field>
            <Field label="Vorbereitung (Min)">
              <input type="number" min={0} value={prepTime} onChange={e => setPrepTime(e.target.value)} className={input()} />
            </Field>
            <Field label="Kochzeit (Min)">
              <input type="number" min={0} value={cookTime} onChange={e => setCookTime(e.target.value)} className={input()} />
            </Field>
          </div>

          <div className="flex items-center gap-8 flex-wrap">
            <Field label="Bewertung">
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={24}
                      className={n <= (hoverRating || rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-200 fill-stone-200'}
                    />
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Favorit">
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={favorite}
                  onChange={e => setFavorite(e.target.checked)}
                  className="w-4 h-4 accent-rose-500"
                />
                <span className="text-sm text-stone-600">Als Favorit markieren</span>
              </label>
            </Field>
          </div>

          <Field label="Bild-URL (optional)">
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://…"
              className={input()}
            />
            <p className="text-xs text-stone-400 mt-1">Leer lassen für ein Standard-Platzhalterbild.</p>
          </Field>

          <Field label="Tags (kommagetrennt)">
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="z. B. italienisch, schnell, vegetarisch"
              className={input()}
            />
          </Field>
        </section>

        {/* Zutaten */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-4">Zutaten *</h2>
          {errors.ingredients && <p className="text-red-500 text-sm mb-3">{errors.ingredients}</p>}

          <div className="space-y-2">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ing.amount}
                  onChange={e => updateIngredient(idx, 'amount', e.target.value)}
                  placeholder="Menge"
                  className={input() + ' w-20'}
                />
                <input
                  type="text"
                  value={ing.unit}
                  onChange={e => updateIngredient(idx, 'unit', e.target.value)}
                  placeholder="Einheit"
                  className={input() + ' w-24'}
                />
                <input
                  type="text"
                  value={ing.name}
                  onChange={e => updateIngredient(idx, 'name', e.target.value)}
                  placeholder="Zutat"
                  className={input() + ' flex-1'}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(idx)}
                  disabled={ingredients.length === 1}
                  className="text-stone-300 hover:text-red-400 disabled:opacity-30 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="mt-3 flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            <Plus size={16} /> Zutat hinzufügen
          </button>
        </section>

        {/* Zubereitung */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-4">Zubereitung *</h2>
          {errors.steps && <p className="text-red-500 text-sm mb-3">{errors.steps}</p>}

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center mt-2.5">
                  {idx + 1}
                </span>
                <textarea
                  value={step.text}
                  onChange={e => updateStep(idx, e.target.value)}
                  placeholder={`Schritt ${idx + 1}…`}
                  rows={2}
                  className={input() + ' flex-1 resize-none'}
                />
                <button
                  type="button"
                  onClick={() => removeStep(idx)}
                  disabled={steps.length === 1}
                  className="text-stone-300 hover:text-red-400 disabled:opacity-30 transition-colors mt-2.5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addStep}
            className="mt-3 flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            <Plus size={16} /> Schritt hinzufügen
          </button>
        </section>

        {/* Tipp */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-stone-700 mb-4">Tipp (optional)</h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Besondere Hinweise, Variationen, Aufbewahrung…"
            rows={3}
            className={input() + ' resize-none'}
          />
        </section>

        <div className="flex gap-3 justify-end">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            Abbrechen
          </Link>
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Rezept speichern
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-600 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function input(error) {
  return `w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition ${
    error ? 'border-red-300' : 'border-stone-200'
  }`
}
