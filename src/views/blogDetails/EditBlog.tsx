'use client'
import { useState } from "react"
import { Blog } from "../../types"

interface EditBlogProps {
  blog: Blog
}

const CATEGORIES = ["Cooking", "Painting", "Gardening", "Sewing", "Crafting", "Woodworking", "Knitting"]

function EditBlog({ blog }: EditBlogProps) {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState(blog.blogTitle)
  const [category, setCategory] = useState(blog.categoryName)
  const [description, setDescription] = useState(blog.description)
  const [ingredients, setIngredients] = useState<string[]>(blog.ingredients)
  const [newIngredient, setNewIngredient] = useState("")
  const [imageUrl, setImageUrl] = useState(blog.imageUrl ?? "")

  const addIngredient = () => {
    const trimmed = newIngredient.trim()
    if (!trimmed) return
    setIngredients(prev => [...prev, trimmed])
    setNewIngredient("")
  }

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const handleOpen = () => {
    setTitle(blog.blogTitle)
    setCategory(blog.categoryName)
    setDescription(blog.description)
    setIngredients(blog.ingredients)
    setImageUrl(blog.imageUrl ?? "")
    setNewIngredient("")
    setShowModal(true)
  }

  return (
    <div className="relative">
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-phthalo hover:text-phthalo transition-all duration-200"
      >
        Edit
      </button>

      <div
        className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${
          showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />

        <div
          className={`relative z-50 w-11/12 max-w-lg bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 max-h-[90vh] overflow-y-auto ${
            showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <h2 className="font-ProtestStrike text-2xl text-ink mb-5">Edit Blog</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all bg-white"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {category === "Cooking" ? "Ingredients" : "Materials"}
            </label>
            <ul className="space-y-1.5 mb-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 text-sm gap-2">
                  <span className="flex-1 truncate">{item}</span>
                  <button
                    onClick={() => removeIngredient(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 text-xs leading-none"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative">
              <input
                value={newIngredient}
                onChange={e => setNewIngredient(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addIngredient()}
                placeholder="Type and press Enter or click Add..."
                className="w-full border border-gray-200 rounded-lg p-2.5 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all"
              />
              <button
                onClick={addIngredient}
                className="absolute right-0 top-0 bottom-0 px-4 bg-phthalo text-white rounded-e-lg text-sm hover:bg-phthalo/90 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Cover Image <span className="font-normal text-gray-400 text-xs">(optional URL)</span>
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Cover preview"
                className="mt-2 w-full h-28 object-cover rounded-lg border border-gray-100"
                onError={e => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2.5 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2 text-sm rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button className="px-5 py-2 text-sm rounded-full bg-phthalo text-white hover:bg-phthalo/90 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBlog
