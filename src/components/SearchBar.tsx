'use client'
import { useState, useRef, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import Link from "next/link"
import { blogs } from "../data/blogs"

function SearchBar() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = query.trim().length > 1
    ? blogs.filter(b =>
        b.blogTitle.toLowerCase().includes(query.toLowerCase()) ||
        b.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        b.nameOfWriter.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <BiSearch size={15} />
      </span>
      <input
        type="search"
        placeholder="Search posts..."
        aria-label="Search posts"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-ink placeholder:text-gray-400 outline-none focus:bg-white focus:border-phthalo/40 focus:ring-2 focus:ring-phthalo/10 transition-all duration-200"
      />

      {open && query.trim().length > 1 && (
        results.length > 0 ? (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden">
            {results.map(b => (
              <Link
                key={b.id}
                href={`/blog/${b.id}`}
                onClick={() => { setOpen(false); setQuery("") }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{b.blogTitle}</p>
                  <p className="text-xs text-gray-400">{b.categoryName} · {b.nameOfWriter}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-50 px-4 py-4 text-sm text-gray-400 text-center">
            No results for &ldquo;{query}&rdquo;
          </div>
        )
      )}
    </div>
  )
}

export default SearchBar
