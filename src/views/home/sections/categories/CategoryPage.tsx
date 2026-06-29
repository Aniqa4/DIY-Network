'use client'
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import BlogCard from "../../../../components/BlogCard"
import { blogs } from "../../../../data/blogs"

const INITIAL_LIMIT = 8

function categoryFromPath(pathname: string): string | null {
  if (pathname === "/") return null
  const segment = pathname.slice(1)
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

function CategoryPage() {
  const pathname = usePathname()
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setShowAll(false)
  }, [pathname])

  const category = categoryFromPath(pathname)
  const filtered = category
    ? blogs.filter((b) => b.categoryName === category)
    : blogs
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)
  const remaining = filtered.length - INITIAL_LIMIT

  return (
    <div className="pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visible.map((blog) => (
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
            <p className="text-ink/40 text-sm font-medium">
              No posts in this category yet.
            </p>
          </div>
        )}
      </div>

      {!showAll && remaining > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border border-ink text-sm font-semibold text-ink hover:bg-ink hover:text-canvas-light transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-phthalo"
          >
            See {remaining} more {remaining === 1 ? "post" : "posts"}
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
