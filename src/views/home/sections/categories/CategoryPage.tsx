'use client'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import BlogCard from "../../../../components/BlogCard"
import { blogs as staticBlogs } from "../../../../data/blogs"
import { useAppSelector } from "../../../../redux/hooks"
import type { Blog } from "../../../../types"
import { LuArrowUpDown } from "react-icons/lu"

type SortOption = "default" | "newest" | "most_liked" | "most_viewed"

const SORT_LABELS: Record<SortOption, string> = {
  default:     "Default",
  newest:      "Newest",
  most_liked:  "Most Liked",
  most_viewed: "Most Viewed",
}

const INITIAL_LIMIT = 8

function categoryFromPath(pathname: string): string | null {
  if (pathname === "/") return null
  const segment = pathname.slice(1)
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

function sortBlogs(list: Blog[], sort: SortOption): Blog[] {
  if (sort === "default") return list
  return [...list].sort((a, b) => {
    if (sort === "newest")      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    if (sort === "most_liked")  return b.likes - a.likes
    if (sort === "most_viewed") return b.views - a.views
    return 0
  })
}

function CategoryPage() {
  const pathname = usePathname()
  const [showAll, setShowAll] = useState(false)
  const [sort, setSort] = useState<SortOption>("default")
  const [sortOpen, setSortOpen] = useState(false)

  const userPosts = useAppSelector(state => state.posts.items)

  useEffect(() => {
    setShowAll(false)
    setSort("default")
  }, [pathname])

  const category = categoryFromPath(pathname)

  // Merge user posts + static blogs (user posts first, then static)
  const allBlogs = [...userPosts, ...staticBlogs]

  const filtered = category
    ? allBlogs.filter(b => b.categoryName === category)
    : allBlogs

  const sorted = sortBlogs(filtered, sort)
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_LIMIT)
  const remaining = sorted.length - INITIAL_LIMIT

  return (
    <div className="pb-10">
      {/* Sort toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          {category ? ` in ${category}` : ""}
        </p>

        <div className="relative">
          <button
            onClick={() => setSortOpen(v => !v)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-ink border border-gray-200 hover:border-gray-300 rounded-full px-3.5 py-1.5 transition-all"
          >
            <LuArrowUpDown size={13} />
            {SORT_LABELS[sort]}
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl border border-gray-100 shadow-lg z-10 overflow-hidden">
              {(Object.keys(SORT_LABELS) as SortOption[]).map(opt => (
                <button
                  key={opt}
                  onClick={() => { setSort(opt); setSortOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    sort === opt
                      ? "text-phthalo bg-phthalo/5 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {SORT_LABELS[opt]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visible.map(blog => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            blogTitle={blog.blogTitle}
            nameOfWriter={blog.nameOfWriter}
            description={blog.description}
            categoryName={blog.categoryName}
            views={blog.views}
            likes={blog.likes}
          />
        ))}

        {visible.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-ink/40 text-sm font-medium">No posts in this category yet.</p>
          </div>
        )}
      </div>

      {!showAll && remaining > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border border-ink text-sm font-semibold text-ink hover:bg-ink hover:text-canvas-light transition-colors duration-200"
          >
            See {remaining} more {remaining === 1 ? "post" : "posts"}
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
