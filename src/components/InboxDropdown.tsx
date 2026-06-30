'use client'
import { useState, useRef, useEffect } from "react"
import { BsChatDots } from "react-icons/bs"
import UserAvatar from "./UserAvatar"

interface Message {
  id: string
  sender: string
  preview: string
  time: string
  unread: boolean
}

const MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    preview: "Love your sourdough recipe! I tried it last weekend and it turned out amazing.",
    time: "2m",
    unread: true,
  },
  {
    id: "2",
    sender: "Tom Greenfield",
    preview: "What type of wood did you use for the floating shelf build?",
    time: "1h",
    unread: true,
  },
  {
    id: "3",
    sender: "Clara Webb",
    preview: "Thanks for the macramé tips, the plant hanger turned out great!",
    time: "3h",
    unread: false,
  },
  {
    id: "4",
    sender: "Priya Nair",
    preview: "Do you have any tips for someone trying curry for the first time?",
    time: "1d",
    unread: false,
  },
]

function InboxDropdown() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(MESSAGES)
  const ref = useRef<HTMLDivElement>(null)
  const unreadCount = messages.filter((m) => m.unread).length

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function markAllRead() {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })))
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg text-gray-500 hover:text-ink hover:bg-gray-100 transition-all duration-200"
        aria-label={`Inbox${unreadCount > 0 ? ` — ${unreadCount} unread` : ""}`}
      >
        <BsChatDots size={19} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-sienna text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">Messages</p>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-sienna/10 text-sienna font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[11px] text-gray-400 hover:text-phthalo transition-colors duration-150"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {messages.map((msg) => (
              <button
                key={msg.id}
                className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors duration-150 text-left ${
                  msg.unread ? "bg-phthalo/[0.025]" : ""
                }`}
              >
                <div className="relative flex-shrink-0 mt-0.5">
                  <UserAvatar size="sm" />
                  {msg.unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-phthalo rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p
                      className={`text-sm ${
                        msg.unread ? "font-semibold text-ink" : "font-medium text-gray-700"
                      }`}
                    >
                      {msg.sender}
                    </p>
                    <p className="text-[10px] text-gray-400 flex-shrink-0">{msg.time}</p>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{msg.preview}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <button className="text-xs text-phthalo font-medium hover:underline">
              Open all messages →
            </button>
            <button className="text-xs text-gray-400 hover:text-ink transition-colors">
              New message
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InboxDropdown
