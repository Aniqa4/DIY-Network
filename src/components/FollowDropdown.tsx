'use client'
import { useState, useRef, useEffect } from "react"
import UserAvatar from "./UserAvatar"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { toggleFollow } from "../redux/features/follows/followsSlice"

export interface FollowUser {
  id: string
  name: string
  bio: string
}

interface FollowDropdownProps {
  type: "followers" | "following"
  users: FollowUser[]
}

function FollowDropdown({ type, users }: FollowDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const followedIds = useAppSelector(state => state.follows.ids)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  // Live count: followers count is fixed (people who follow you); following count reflects Redux state
  const displayCount = type === "following" ? followedIds.length : users.length

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="text-center group outline-none">
        <p className="text-lg font-semibold text-ink group-hover:text-phthalo transition-colors duration-150">
          {displayCount}
        </p>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
          {type === "followers" ? "Followers" : "Following"}
        </p>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-30">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink capitalize">{type}</p>
            <span className="text-xs text-gray-400">{displayCount} people</span>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
            {users.map(user => {
              const isFollowing = followedIds.includes(user.id)
              return (
                <div key={user.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <UserAvatar size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.bio}</p>
                  </div>
                  <button
                    onClick={() => dispatch(toggleFollow(user.id))}
                    className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 ${
                      isFollowing
                        ? "border border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                        : "bg-phthalo text-white hover:bg-phthalo/85"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100">
            <button className="text-xs text-phthalo font-medium hover:underline">
              See all {type} →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FollowDropdown
