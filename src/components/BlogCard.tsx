'use client'
import Link from "next/link"
import { MdFavorite } from "react-icons/md"
import { TiEye } from "react-icons/ti"
import { LuClock } from "react-icons/lu"
import UserAvatar from "./UserAvatar"
import { readingTime } from "../utils/readingTime"

interface CategoryStyle {
  gradient: string
  label: string
  pill: string
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Cooking:    { gradient: "from-orange-100 via-amber-50 to-orange-50",    label: "text-orange-600",  pill: "bg-orange-100 text-orange-700 border-orange-200"   },
  Painting:   { gradient: "from-violet-100 via-purple-50 to-violet-50",   label: "text-violet-600",  pill: "bg-violet-100 text-violet-700 border-violet-200"   },
  Gardening:  { gradient: "from-emerald-100 via-green-50 to-emerald-50",  label: "text-emerald-600", pill: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  Sewing:     { gradient: "from-pink-100 via-rose-50 to-pink-50",         label: "text-pink-600",    pill: "bg-pink-100 text-pink-700 border-pink-200"         },
  Crafting:   { gradient: "from-amber-100 via-yellow-50 to-amber-50",     label: "text-amber-600",   pill: "bg-amber-100 text-amber-700 border-amber-200"      },
  Woodworking:{ gradient: "from-stone-200 via-stone-100 to-stone-50",     label: "text-stone-600",   pill: "bg-stone-100 text-stone-700 border-stone-200"      },
  Knitting:   { gradient: "from-sky-100 via-blue-50 to-sky-50",           label: "text-sky-600",     pill: "bg-sky-100 text-sky-700 border-sky-200"            },
}

const DEFAULT_STYLE: CategoryStyle = {
  gradient: "from-gray-100 via-gray-50 to-white",
  label:    "text-gray-500",
  pill:     "bg-gray-100 text-gray-600 border-gray-200",
}

interface BlogCardProps {
  id?: string
  blogTitle?: string
  nameOfWriter?: string
  description?: string
  categoryName?: string
  views?: number
  likes?: number
}

function BlogCard({ id, blogTitle, nameOfWriter, description, categoryName, views, likes }: BlogCardProps) {
  const style = CATEGORY_STYLES[categoryName ?? ""] ?? DEFAULT_STYLE
  const readTime = description ? readingTime(description) : null

  return (
    <Link href={`/blog/${id}`} className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-phthalo rounded-xl">
      <article className="bg-white border border-gray-100 rounded-xl overflow-hidden h-full flex flex-col shadow-sm group-hover:shadow-md group-hover:border-gray-200 transition-all duration-200">

        {/* Gradient header with category pill */}
        <div className={`relative h-28 bg-gradient-to-br ${style.gradient} flex-shrink-0 flex items-end p-3`}>
          <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.pill}`}>
            {categoryName ?? "General"}
          </span>
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 font-ProtestStrike text-6xl opacity-[0.07] ${style.label} select-none pointer-events-none`}>
            {categoryName?.[0] ?? "·"}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <h2 className="font-ProtestStrike text-[1.05rem] leading-snug text-ink line-clamp-2 group-hover:text-phthalo transition-colors duration-200">
            {blogTitle}
          </h2>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
            <Link
              href="/user"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 group/author"
            >
              <UserAvatar size="sm" />
              <span className="text-xs font-medium text-gray-500 group-hover/author:text-ink transition-colors duration-150 max-w-[80px] truncate">
                {nameOfWriter}
              </span>
            </Link>

            <div className="flex items-center gap-3 text-gray-400">
              {readTime && (
                <span className="flex items-center gap-1 text-[11px]">
                  <LuClock size={11} />
                  {readTime}
                </span>
              )}
              {views != null && (
                <span className="flex items-center gap-1 text-[11px]">
                  <TiEye size={13} />
                  {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
                </span>
              )}
              {likes != null && (
                <span className="flex items-center gap-1 text-[11px]">
                  <MdFavorite size={11} />
                  {likes}
                </span>
              )}
            </div>
          </div>
        </div>

      </article>
    </Link>
  )
}

export default BlogCard
