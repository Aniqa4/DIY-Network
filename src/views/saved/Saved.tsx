'use client'
import { useState } from "react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import BlogCard from "../../components/BlogCard"
import { useAppSelector } from "../../redux/hooks"
import { blogs } from "../../data/blogs"

type Tab = "saved" | "history"

function Saved() {
  const [activeTab, setActiveTab] = useState<Tab>("saved")

  const savedIds = useAppSelector(state => state.saved.ids)
  const historyIds = useAppSelector(state => state.history.ids)

  // Merge user posts with static blogs so user-created posts can be found too
  const userPosts = useAppSelector(state => state.posts.items)
  const allBlogs = [...userPosts, ...blogs]

  const savedBlogs = allBlogs.filter(b => savedIds.includes(b.id))
  const historyBlogs = historyIds
    .map(id => allBlogs.find(b => b.id === id))
    .filter(Boolean) as typeof blogs

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "saved",   label: "Saved",          count: savedBlogs.length  },
    { id: "history", label: "Recently Viewed", count: historyBlogs.length },
  ]

  const activeBlogs = activeTab === "saved" ? savedBlogs : historyBlogs

  return (
    <div className="min-h-screen">
      <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow-sm">
        <Navbar />
      </div>

      <div className="pt-14">
        <div className="container mx-auto max-w-5xl px-6 py-10">

          <h1 className="font-ProtestStrike text-3xl text-ink mb-6">Your Library</h1>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-gray-100 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 -mb-px ${
                  activeTab === tab.id
                    ? "border-phthalo text-ink"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  activeTab === tab.id ? "bg-phthalo/10 text-phthalo" : "bg-gray-100 text-gray-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {activeBlogs.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-ProtestStrike text-[7rem] leading-none text-canvas-dark select-none mb-4">0</p>
              {activeTab === "saved" ? (
                <>
                  <p className="text-gray-500 mb-2">Nothing saved yet.</p>
                  <p className="text-sm text-gray-400 mb-8">Hit <strong>Save</strong> on any post to bookmark it here.</p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-2">No reading history yet.</p>
                  <p className="text-sm text-gray-400 mb-8">Posts you open will appear here.</p>
                </>
              )}
              <Link
                href="/"
                className="px-6 py-2.5 bg-phthalo text-white rounded-full text-sm font-medium hover:bg-phthalo/90 transition-colors"
              >
                Browse posts
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeBlogs.map(blog => (
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
