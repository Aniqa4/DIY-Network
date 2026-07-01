'use client'
import { useState, useEffect } from "react"
import UserAvatar from "../../components/UserAvatar"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { TiEye } from "react-icons/ti"
import { BsDot } from "react-icons/bs"
import { HiOutlineSaveAs, HiSaveAs } from "react-icons/hi"
import { FiShare2 } from "react-icons/fi"
import { BiMessageRounded } from "react-icons/bi"
import { LuClock } from "react-icons/lu"
import Link from "next/link"
import { useParams } from "next/navigation"
import Navbar from "../../components/Navbar"
import EditBlog from "./EditBlog"
import { getBlogById, blogs } from "../../data/blogs"
import { readingTime } from "../../utils/readingTime"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { toggleSaved } from "../../redux/features/saved/savedSlice"
import { toggleLiked } from "../../redux/features/liked/likedSlice"
import { addToHistory } from "../../redux/features/history/historySlice"
import { addNotification } from "../../redux/features/notifications/notificationsSlice"
import { useToast } from "../../context/ToastContext"

const CATEGORY_STYLES: Record<string, { gradient: string; label: string; accent: string }> = {
  Cooking:     { gradient: "from-orange-200 via-amber-100 to-orange-50",    label: "text-orange-500",  accent: "bg-orange-100 text-orange-700 border-orange-200"   },
  Painting:    { gradient: "from-violet-200 via-purple-100 to-violet-50",   label: "text-violet-500",  accent: "bg-violet-100 text-violet-700 border-violet-200"   },
  Gardening:   { gradient: "from-emerald-200 via-green-100 to-emerald-50",  label: "text-emerald-500", accent: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Sewing:      { gradient: "from-pink-200 via-rose-100 to-pink-50",         label: "text-pink-500",    accent: "bg-pink-100 text-pink-700 border-pink-200"         },
  Crafting:    { gradient: "from-amber-200 via-yellow-100 to-amber-50",     label: "text-amber-500",   accent: "bg-amber-100 text-amber-700 border-amber-200"      },
  Woodworking: { gradient: "from-stone-300 via-stone-200 to-stone-100",     label: "text-stone-500",   accent: "bg-stone-100 text-stone-700 border-stone-200"      },
  Knitting:    { gradient: "from-sky-200 via-blue-100 to-sky-50",           label: "text-sky-500",     accent: "bg-sky-100 text-sky-700 border-sky-200"            },
}

const DEFAULT_STYLE = {
  gradient: "from-gray-200 via-gray-100 to-gray-50",
  label: "text-gray-400",
  accent: "bg-gray-100 text-gray-600 border-gray-200",
}

interface Comment {
  id: number
  name: string
  text: string
  date: string
}

const SEED_COMMENTS: Comment[] = [
  { id: 1, name: "Lily Park",      text: "This was so helpful! I tried it last weekend and it turned out perfect.", date: "June 12, 2025" },
  { id: 2, name: "Tom Greenfield", text: "Great step-by-step breakdown. One tip: letting it rest a bit longer really helped.", date: "June 15, 2025" },
  { id: 3, name: "Sarah Chen",     text: "Love this! Bookmarked it for the holidays.", date: "June 22, 2025" },
]

function BlogDetails() {
  const [readProgress, setReadProgress] = useState(0)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS)
  const [commentText, setCommentText] = useState("")

  const { id } = useParams<{ id: string }>()
  const blog = getBlogById(id)

  const dispatch = useAppDispatch()
  const savedIds = useAppSelector(state => state.saved.ids)
  const likedIds = useAppSelector(state => state.liked.ids)
  const user = useAppSelector(state => state.auth.user)
  const isSaved = blog ? savedIds.includes(blog.id) : false
  const isLiked = blog ? likedIds.includes(blog.id) : false

  const { toast } = useToast()

  // Track reading history
  useEffect(() => {
    if (blog) dispatch(addToHistory(blog.id))
  }, [blog?.id])

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrollHeight = el.scrollHeight - el.clientHeight
      setReadProgress(scrollHeight > 0 ? (el.scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!blog) {
    return (
      <div className="min-h-screen">
        <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow-sm">
          <Navbar />
        </div>
        <div className="pt-20 text-center py-20 text-gray-500">Blog not found.</div>
      </div>
    )
  }

  const style = CATEGORY_STYLES[blog.categoryName] ?? DEFAULT_STYLE
  const related = blogs.filter(b => b.categoryName === blog.categoryName && b.id !== blog.id).slice(0, 3)
  const contentLabel = blog.categoryName === "Cooking" ? "Recipe" : "Instructions"
  const readTime = readingTime(blog.description + " " + blog.ingredients.join(" "))
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleLike = () => {
    dispatch(toggleLiked(blog.id))
    toast(!isLiked ? "Added to likes" : "Removed from likes")
  }

  const handleSave = () => {
    dispatch(toggleSaved(blog.id))
    if (!isSaved) {
      dispatch(addNotification({ type: "save", message: `You saved "${blog.blogTitle}"`, blogTitle: blog.blogTitle }))
    }
    toast(!isSaved ? "Post saved!" : "Removed from saved")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true)
      toast("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handlePostComment = () => {
    if (!commentText.trim()) return
    const newComment: Comment = {
      id: Date.now(),
      name: user?.name ?? "You",
      text: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    }
    setComments(prev => [...prev, newComment])
    dispatch(addNotification({ type: "comment", message: `You commented on "${blog.blogTitle}"`, blogTitle: blog.blogTitle }))
    toast("Comment posted!")
    setCommentText("")
  }

  const handleDelete = () => {
    toast("Post deleted", "error")
  }

  return (
    <div className="min-h-screen">
      {/* Reading progress bar */}
      <div
        className="fixed top-14 left-0 z-30 h-[2px] bg-phthalo transition-all duration-100 ease-out"
        style={{ width: `${readProgress}%` }}
      />

      <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow-sm">
        <Navbar />
      </div>

      {/* Share modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowShare(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="font-ProtestStrike text-xl text-ink mb-1">Share this post</h3>
            <p className="text-sm text-gray-500 mb-4 truncate">{blog.blogTitle}</p>
            <div className="flex gap-2 mb-4">
              <input
                readOnly
                value={pageUrl}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 bg-gray-50 overflow-hidden min-w-0"
              />
              <button
                onClick={handleCopyLink}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  copied ? "bg-phthalo/10 text-phthalo" : "bg-phthalo text-white hover:bg-phthalo/90"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={() => setShowShare(false)}
              className="w-full py-2 text-sm text-gray-400 hover:text-ink transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="pt-14">
        {/* Hero */}
        <div className={`relative overflow-hidden py-14 px-6 ${blog.imageUrl ? "" : `bg-gradient-to-br ${style.gradient}`}`}>
          {blog.imageUrl && (
            <>
              <img src={blog.imageUrl} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
          <div className={`container mx-auto max-w-4xl relative z-10 ${blog.imageUrl ? "text-white" : ""}`}>
            <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border mb-5 ${blog.imageUrl ? "bg-white/20 text-white border-white/30" : style.accent}`}>
              {blog.categoryName}
            </span>
            <h1 className="font-ProtestStrike text-4xl md:text-5xl leading-tight mb-6 max-w-3xl">
              {blog.blogTitle}
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/user">
                <div className="flex items-center gap-3 group">
                  <UserAvatar size="sm" />
                  <div>
                    <p className={`font-semibold text-sm group-hover:text-phthalo transition-colors ${blog.imageUrl ? "text-white group-hover:text-white/80" : "text-ink"}`}>
                      {blog.nameOfWriter}
                    </p>
                    <p className={`text-xs ${blog.imageUrl ? "text-white/60" : "text-gray-500"}`}>{blog.postedAt}</p>
                  </div>
                </div>
              </Link>
              <span className={`flex items-center gap-1.5 text-xs ${blog.imageUrl ? "text-white/70" : "text-gray-500"}`}>
                <LuClock size={12} />
                {readTime}
              </span>
            </div>
          </div>
          {!blog.imageUrl && (
            <span className={`absolute right-8 top-1/2 -translate-y-1/2 font-ProtestStrike text-[11rem] opacity-[0.07] ${style.label} select-none pointer-events-none leading-none`}>
              {blog.categoryName?.[0]}
            </span>
          )}
        </div>

        {/* Sticky stats + actions bar */}
        <div className="bg-white border-b border-gray-100 sticky top-14 z-10">
          <div className="container mx-auto max-w-4xl px-6 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5"><TiEye size={15} />{blog.views >= 1000 ? `${(blog.views / 1000).toFixed(1)}k` : blog.views}</span>
              <BsDot className="text-gray-300" />
              <span className="flex items-center gap-1.5"><MdFavorite size={13} />{blog.likes + (isLiked ? 1 : 0)}</span>
              <BsDot className="text-gray-300" />
              <span className="flex items-center gap-1.5"><HiOutlineSaveAs size={14} />{blog.saved + (isSaved ? 1 : 0)}</span>
              <BsDot className="text-gray-300" />
              <span className="flex items-center gap-1.5"><BiMessageRounded size={14} />{comments.length}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  isLiked ? "border-sienna bg-sienna/10 text-sienna" : "border-gray-200 text-gray-600 hover:border-sienna hover:text-sienna"
                }`}
              >
                {isLiked ? <MdFavorite size={14} /> : <MdFavoriteBorder size={14} />}
                {isLiked ? "Liked" : "Like"}
              </button>

              <button
                onClick={handleSave}
                className={`flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  isSaved ? "border-phthalo bg-phthalo/10 text-phthalo" : "border-gray-200 text-gray-600 hover:border-phthalo hover:text-phthalo"
                }`}
              >
                {isSaved ? <HiSaveAs size={14} /> : <HiOutlineSaveAs size={14} />}
                {isSaved ? "Saved" : "Save"}
              </button>

              <button
                onClick={() => setShowShare(true)}
                className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-all duration-200"
              >
                <FiShare2 size={13} />
                Share
              </button>

              <EditBlog blog={blog} />

              <button
                onClick={handleDelete}
                className="text-sm px-4 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto max-w-4xl px-6 py-10">
          <div className="grid md:grid-cols-[260px_1fr] gap-6">

            {/* Ingredients sidebar */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm md:sticky md:top-32">
                <h2 className="font-ProtestStrike text-lg text-ink mb-4">
                  {blog.categoryName === "Cooking" ? "Ingredients" : "Materials"}
                </h2>
                <ul className="space-y-2.5">
                  {blog.ingredients.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug">
                      <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-phthalo flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="font-ProtestStrike text-2xl text-ink mb-5">{contentLabel}</h2>
                <p className="text-gray-700 leading-relaxed text-[1.05rem]">{blog.description}</p>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-12">
            <h2 className="font-ProtestStrike text-2xl text-ink mb-6">
              Comments <span className="text-gray-400 font-sans font-normal text-base">({comments.length})</span>
            </h2>

            <div className="space-y-4 mb-6">
              {comments.map(comment => (
                <div key={comment.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex gap-4">
                  <UserAvatar size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-sm text-ink">{comment.name}</span>
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment form */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex gap-4">
              <UserAvatar size="sm" />
              <div className="flex-1 flex flex-col gap-3">
                <textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/40 transition-all bg-gray-50 focus:bg-white"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handlePostComment}
                    disabled={!commentText.trim()}
                    className="px-5 py-2 bg-phthalo text-white text-sm rounded-full disabled:opacity-40 hover:bg-phthalo/90 transition-all duration-200"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-ProtestStrike text-2xl text-ink mb-6">More in {blog.categoryName}</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {related.map(rel => {
                  const relStyle = CATEGORY_STYLES[rel.categoryName] ?? DEFAULT_STYLE
                  return (
                    <Link key={rel.id} href={`/blog/${rel.id}`} className="group block">
                      <article className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 h-full flex flex-col">
                        <div className={`h-16 bg-gradient-to-br ${relStyle.gradient} relative flex-shrink-0 flex items-end p-3`}>
                          <span className={`inline-flex text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${relStyle.accent}`}>
                            {rel.categoryName}
                          </span>
                          <span className={`absolute right-3 top-1/2 -translate-y-1/2 font-ProtestStrike text-5xl opacity-[0.07] ${relStyle.label} select-none pointer-events-none`}>
                            {rel.categoryName?.[0]}
                          </span>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <h3 className="font-ProtestStrike text-[0.95rem] leading-snug text-ink group-hover:text-phthalo transition-colors line-clamp-2 mb-2">
                            {rel.blogTitle}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-2 flex-1">{rel.description}</p>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                            <TiEye size={13} />
                            <span>{rel.views >= 1000 ? `${(rel.views / 1000).toFixed(1)}k` : rel.views}</span>
                            <BsDot />
                            <MdFavorite size={11} />
                            <span>{rel.likes}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
