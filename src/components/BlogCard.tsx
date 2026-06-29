'use client'
import { useState } from "react"
import Link from "next/link"
import { MdFavorite } from "react-icons/md"
import { TiEye } from "react-icons/ti"
import UserAvatar from "./UserAvatar"

interface CategoryStyle {
  gradient: string
  label: string
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Cooking:   { gradient: "from-orange-200 to-amber-50",   label: "text-orange-700"  },
  Painting:  { gradient: "from-purple-200 to-violet-50",  label: "text-purple-700"  },
  Gardening: { gradient: "from-emerald-200 to-green-50",  label: "text-emerald-700" },
  Sewing:    { gradient: "from-pink-200 to-rose-50",      label: "text-pink-700"    },
  Crafting:  { gradient: "from-amber-200 to-yellow-50",   label: "text-amber-700"   },
}

const DEFAULT_STYLE: CategoryStyle = { gradient: "from-canvas to-canvas-light", label: "text-ink/50" }

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
  const [imgError, setImgError] = useState(false)
  const style = CATEGORY_STYLES[categoryName ?? ""] ?? DEFAULT_STYLE

  return (
    <Link href={`/blog/${id}`} className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-phthalo rounded-lg">
      <article className="bg-canvas-light border border-canvas-dark rounded-lg overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">

        <div className={`h-44 bg-gradient-to-br ${style.gradient} flex items-center justify-center flex-shrink-0`}>
          <span className="font-ProtestStrike text-7xl text-ink/10 select-none">
            {categoryName?.[0] ?? "·"}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-semibold ${style.label}`}>
            {categoryName}
          </span>

          <h2 className="font-ProtestStrike text-xl leading-tight text-ink line-clamp-2">
            {blogTitle}
          </h2>

          <p className="text-sm text-ink/55 leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          <div className="pt-3 mt-auto border-t border-canvas-dark flex items-center justify-between">
            <Link
              href="/user"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:text-phthalo transition-colors duration-200"
            >
              <img
                src=""
                alt={nameOfWriter ?? ""}
                onError={() => setImgError(true)}
                className={imgError ? "hidden" : "w-6 h-6 rounded-full object-cover"}
              />
              {imgError && (
                <span className="w-6 h-6 flex-shrink-0">
                  <UserAvatar size="sm" />
                </span>
              )}
              <span className="text-xs font-semibold text-ink/70">{nameOfWriter}</span>
            </Link>

            {(views != null || likes != null) && (
              <div className="flex items-center gap-3 text-ink/40">
                {views != null && (
                  <span className="flex items-center gap-1 text-xs">
                    <TiEye size={13} />
                    {views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views}
                  </span>
                )}
                {likes != null && (
                  <span className="flex items-center gap-1 text-xs">
                    <MdFavorite size={11} />
                    {likes}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default BlogCard
