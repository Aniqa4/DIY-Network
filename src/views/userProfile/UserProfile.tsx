'use client'
import { useState, useRef } from "react"
import Navbar from "../../components/Navbar"
import BlogCard from "../../components/BlogCard"
import UserAvatar from "../../components/UserAvatar"
import AddBlog from "./AddBlog"
import FollowDropdown from "../../components/FollowDropdown"
import { useMessages } from "../../context/MessagesContext"
import { blogs } from "../../data/blogs"
import { LuCamera } from "react-icons/lu"

const FOLLOWERS = [
  { id: "f1", name: "Sarah Chen",       bio: "Painter & watercolor enthusiast",    isFollowing: true  },
  { id: "f2", name: "Tom Greenfield",   bio: "Gardener · Woodworker",              isFollowing: false },
  { id: "f3", name: "Hannah Brooks",    bio: "Baker and sourdough lover",          isFollowing: true  },
  { id: "f4", name: "Priya Nair",       bio: "Home cook from Chennai",             isFollowing: false },
  { id: "f5", name: "James Okafor",     bio: "Artist & DIY maker",                 isFollowing: false },
  { id: "f6", name: "Elena Vasquez",    bio: "Oil painter · Plein air",            isFollowing: true  },
]

const FOLLOWING = [
  { id: "g1", name: "Clara Webb",       bio: "Macramé & textile artist",           isFollowing: true },
  { id: "g2", name: "Ruth Carter",      bio: "Quilter · Woodworker",               isFollowing: true },
  { id: "g3", name: "Lily Park",        bio: "Plant mom · Succulent collector",    isFollowing: true },
  { id: "g4", name: "Fatima Al-Rashid", bio: "Embroidery & hand-sewing",           isFollowing: true },
  { id: "g5", name: "Mia Thompson",     bio: "Crafter & decoupage artist",         isFollowing: true },
]

const PROFILE_BLOGS = [
  blogs[0],   // Cooking
  blogs[2],   // Cooking
  blogs[3],   // Painting
  blogs[6],   // Gardening
  blogs[8],   // Sewing
  blogs[10],  // Crafting
  blogs[12],  // Woodworking
  blogs[15],  // Knitting
]

function UserProfile() {
  const [scrolling, setScrolling] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const { openDm } = useMessages()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarSrc(URL.createObjectURL(file))
  }

  const DEFAULT_BIO = "Home cook, amateur woodworker, and occasional gardener based in Rome. I share recipes, weekend builds, and anything I make with my hands. Sourdough obsessed. Always experimenting."
  const [bio, setBio] = useState(DEFAULT_BIO)
  const [editingBio, setEditingBio] = useState(false)
  const [draftBio, setDraftBio] = useState(bio)

  const categories = ["All", ...Array.from(new Set(PROFILE_BLOGS.map((b) => b.categoryName)))]

  const visible =
    activeCategory === "All"
      ? PROFILE_BLOGS
      : PROFILE_BLOGS.filter((b) => b.categoryName === activeCategory)

  return (
    <div className="bg-white min-h-screen">
      <div
        className={
          scrolling
            ? "fixed left-0 right-0 top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            : "fixed left-0 right-0 top-0 z-20 bg-white border-b border-gray-100"
        }
      >
        <Navbar />
      </div>

      <div className="pt-14">
        {/* Cover */}
        <div className="h-52 bg-gradient-to-r from-phthalo via-phthalo/80 to-sienna/60 w-full" />

        <div className="max-w-7xl mx-auto px-8">

          {/* Profile header */}
          <div className="flex items-end justify-between -mt-12 mb-8 flex-wrap gap-4">
            <div className="flex items-end gap-4">
              <div
                className="relative w-24 h-24 rounded-full ring-4 ring-white shadow-lg flex-shrink-0 cursor-pointer group"
                onClick={() => avatarInputRef.current?.click()}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-phthalo flex items-center justify-center">
                    <UserAvatar size="md" />
                  </div>
                )}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <LuCamera size={22} className="text-white" />
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div className="pb-1">
                <h1 className="font-ProtestStrike text-2xl text-ink">Marco Russo</h1>
                <p className="text-sm text-gray-500 mt-0.5">Maker · Cook · Woodworker</p>
              </div>
            </div>

            <div className="flex items-center gap-5 pb-1 flex-wrap">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <p className="text-lg font-semibold text-ink">{PROFILE_BLOGS.length}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Posts</p>
                </div>
                <div className="w-px h-8 bg-gray-100" />
                <FollowDropdown type="followers" count={FOLLOWERS.length} users={FOLLOWERS} />
                <div className="w-px h-8 bg-gray-100" />
                <FollowDropdown type="following" count={FOLLOWING.length} users={FOLLOWING} />
              </div>

              <div className="flex items-center gap-2">
                <button className="px-5 py-2 rounded-full bg-phthalo text-white text-sm font-medium hover:bg-phthalo/85 transition-colors duration-200">
                  Follow
                </button>
                <button
                  onClick={() => openDm("Marco Russo")}
                  className="px-5 py-2 rounded-full border border-gray-200 text-ink/70 text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                >
                  Message
                </button>
                <AddBlog />
              </div>
            </div>
          </div>

          {/* About */}
          <div className="mb-8 max-w-2xl">
            {editingBio ? (
              <div className="flex flex-col gap-2">
                <textarea
                  autoFocus
                  value={draftBio}
                  onChange={(e) => setDraftBio(e.target.value)}
                  rows={3}
                  className="w-full text-sm text-ink leading-relaxed resize-none border-b border-phthalo/40 bg-transparent outline-none placeholder:text-gray-300 focus:border-phthalo transition-colors duration-200"
                  placeholder="Write something about yourself…"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setBio(draftBio.trim() || DEFAULT_BIO); setEditingBio(false) }}
                    className="text-xs font-semibold text-white bg-phthalo px-4 py-1.5 rounded-full hover:bg-phthalo/85 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setDraftBio(bio); setEditingBio(false) }}
                    className="text-xs font-medium text-gray-400 hover:text-ink transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {bio}
                </p>
                <button
                  onClick={() => { setDraftBio(bio); setEditingBio(true) }}
                  aria-label="Edit bio"
                  className="flex-shrink-0 mt-0.5 p-1 rounded text-gray-300 hover:text-phthalo hover:bg-phthalo/5 transition-all duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Category tabs + posts */}
          <div className="border-t border-gray-100 pt-6 pb-16">

            {/* Tabs */}
            <div className="flex items-center gap-0 mb-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => {
                const count = cat === "All" ? PROFILE_BLOGS.length : PROFILE_BLOGS.filter((b) => b.categoryName === cat).length
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isActive
                        ? "border-phthalo text-ink"
                        : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
                    }`}
                  >
                    {cat}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? "bg-phthalo/10 text-phthalo" : "bg-gray-100 text-gray-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
            </div>

            {visible.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-sm text-gray-400">No posts in this category yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default UserProfile
