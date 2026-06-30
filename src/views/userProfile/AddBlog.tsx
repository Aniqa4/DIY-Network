'use client'
import { useState } from "react"
import { BsPlusCircle } from "react-icons/bs"

const SUGGESTED_CATEGORIES = [
  "Cooking", "Painting", "Gardening", "Sewing",
  "Crafting", "Woodworking", "Knitting",
]

const inputCls =
  "w-full border-b border-gray-200 bg-transparent pb-2 pt-1 text-sm text-ink placeholder:text-gray-400 outline-none focus:border-phthalo transition-colors duration-200"

const labelCls =
  "block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5"

function AddBlog() {
  const [showModal, setShowModal] = useState(false)
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const isNew = category.trim() !== "" && !SUGGESTED_CATEGORIES.some(
    (c) => c.toLowerCase() === category.trim().toLowerCase()
  )

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-ink/70 hover:border-phthalo hover:text-phthalo transition-all duration-200"
        aria-label="Add new post"
      >
        <BsPlusCircle size={15} />
        <span>New post</span>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowModal(false)}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none`}
      >
        <div
          className={`relative w-full max-w-lg bg-white rounded-2xl shadow-xl pointer-events-auto transition-all duration-300 ${
            showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-gray-100">
            <div>
              <h2 className="font-ProtestStrike text-xl text-ink">New Post</h2>
              <p className="text-xs text-gray-400 mt-0.5">Share something you made</p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-ink transition-all duration-200 text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Form */}
          <div className="px-7 py-6 space-y-6">
            {/* Title */}
            <div>
              <label className={labelCls}>Title</label>
              <input
                type="text"
                placeholder="What did you make?"
                className={inputCls}
              />
            </div>

            {/* Category — free text with datalist suggestions */}
            <div>
              <label className={labelCls}>
                Category
                {isNew && (
                  <span className="ml-2 normal-case tracking-normal text-phthalo font-medium">
                    · New category
                  </span>
                )}
              </label>
              <input
                type="text"
                list="category-suggestions"
                placeholder="e.g. Cooking, Origami, Candle Making…"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputCls}
                autoComplete="off"
              />
              <datalist id="category-suggestions">
                {SUGGESTED_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <p className="text-[11px] text-gray-400 mt-1.5">
                Pick an existing category or type your own.
              </p>
            </div>

            {/* Cover image */}
            <div>
              <label className={labelCls}>Cover Image <span className="normal-case tracking-normal font-normal text-gray-300">(optional URL)</span></label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className={inputCls}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Cover preview"
                  className="mt-3 w-full h-32 object-cover rounded-lg border border-gray-100"
                  onError={e => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label className={labelCls}>Materials / Ingredients</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type an item and press Add"
                  className="w-full border-b border-gray-200 bg-transparent pb-2 pt-1 pr-16 text-sm text-ink placeholder:text-gray-400 outline-none focus:border-phthalo transition-colors duration-200"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-semibold text-phthalo hover:text-phthalo/70 transition-colors">
                  Add
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className={labelCls}>Content</label>
              <textarea
                placeholder="Describe what you made and how…"
                rows={4}
                className="w-full border-b border-gray-200 bg-transparent pb-2 pt-1 text-sm text-ink placeholder:text-gray-400 outline-none focus:border-phthalo transition-colors duration-200 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-7 pb-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button className="px-6 py-2.5 rounded-full bg-phthalo text-white text-sm font-medium hover:bg-phthalo/85 transition-colors duration-200">
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBlog
