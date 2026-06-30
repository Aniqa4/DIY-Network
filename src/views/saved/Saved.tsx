'use client'
import Link from "next/link"
import Navbar from "../../components/Navbar"
import BlogCard from "../../components/BlogCard"
import { useAppSelector } from "../../redux/hooks"
import { blogs } from "../../data/blogs"

function Saved() {
  const savedIds = useAppSelector(state => state.saved.ids)
  const savedBlogs = blogs.filter(b => savedIds.includes(b.id))

  return (
    <div className="min-h-screen">
      <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow-sm">
        <Navbar />
      </div>

      <div className="pt-14">
        <div className="container mx-auto max-w-4xl px-6 py-10">
          <h1 className="font-ProtestStrike text-3xl text-ink mb-1">Saved Posts</h1>
          <p className="text-sm text-gray-500 mb-8">
            {savedBlogs.length} {savedBlogs.length === 1 ? "post" : "posts"} saved
          </p>

          {savedBlogs.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-ProtestStrike text-[7rem] leading-none text-canvas-dark select-none mb-4">0</p>
              <p className="text-gray-500 mb-2">Nothing saved yet.</p>
              <p className="text-sm text-gray-400 mb-8">Hit <strong>Save</strong> on any post to bookmark it here.</p>
              <Link
                href="/"
                className="px-6 py-2.5 bg-phthalo text-white rounded-full text-sm font-medium hover:bg-phthalo/90 transition-colors"
              >
                Browse posts
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedBlogs.map(blog => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Saved
