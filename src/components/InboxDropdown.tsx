'use client'
import { useState, useRef, useEffect } from "react"
import { BsBell } from "react-icons/bs"
import { MdFavorite, MdPersonAdd } from "react-icons/md"
import { BiMessageRounded } from "react-icons/bi"
import { HiOutlineSaveAs } from "react-icons/hi"
import { LuFeather } from "react-icons/lu"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { markAllRead, markRead } from "../redux/features/notifications/notificationsSlice"
import type { NotifType } from "../redux/features/notifications/notificationsSlice"

interface Props { unreadCount: number }

function typeIcon(type: NotifType) {
  switch (type) {
    case "like":    return <MdFavorite size={12} className="text-sienna" />
    case "comment": return <BiMessageRounded size={12} className="text-phthalo" />
    case "follow":  return <MdPersonAdd size={12} className="text-violet-500" />
    case "save":    return <HiOutlineSaveAs size={12} className="text-amber-500" />
    case "publish": return <LuFeather size={12} className="text-emerald-500" />
  }
}

function InboxDropdown({ unreadCount }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const notifications = useAppSelector(state => state.notifications.items)
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative p-2 rounded-lg text-gray-500 hover:text-ink hover:bg-gray-100 transition-all duration-200"
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
      >
        <BsBell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-sienna text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">Notifications</p>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-sienna/10 text-sienna font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(markAllRead())}
                className="text-[11px] text-gray-400 hover:text-phthalo transition-colors duration-150"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No notifications yet.</p>
            ) : (
              notifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => dispatch(markRead(n.id))}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors duration-150 text-left ${
                    !n.read ? "bg-phthalo/[0.025]" : ""
                  }`}
                >
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !n.read ? "bg-gray-100" : "bg-gray-50"
                  }`}>
                    {typeIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-xs leading-relaxed ${!n.read ? "text-ink font-medium" : "text-gray-600"}`}>
                        {n.message}
                        {n.blogTitle && (
                          <span className="text-gray-400"> · {n.blogTitle}</span>
                        )}
                      </p>
                      <p className="text-[10px] text-gray-400 flex-shrink-0 mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-phthalo mt-1.5" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button className="text-xs text-phthalo font-medium hover:underline">
              See all notifications →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InboxDropdown
