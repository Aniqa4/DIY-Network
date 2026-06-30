'use client'
import { useState, useRef, useEffect } from "react"
import { BsEnvelope, BsPencilSquare, BsSend } from "react-icons/bs"
import UserAvatar from "./UserAvatar"
import { useMessages } from "../context/MessagesContext"

interface ChatMessage {
  id: string
  text: string
  fromMe: boolean
  time: string
}

interface Conversation {
  id: string
  user: string
  bio: string
  lastMessage: string
  time: string
  unread: boolean
  messages: ChatMessage[]
}

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    user: "Sarah Chen",
    bio: "Painter & watercolor enthusiast",
    lastMessage: "Any tips for the crust?",
    time: "2m",
    unread: true,
    messages: [
      { id: "1", text: "Love your sourdough recipe! I tried it last weekend.", fromMe: false, time: "10:32" },
      { id: "2", text: "Thank you! How did it turn out?", fromMe: true, time: "10:35" },
      { id: "3", text: "Amazing — but the crust was a bit tough. Any tips?", fromMe: false, time: "10:36" },
      { id: "4", text: "Try dropping the temp to 230°C for the last 15 minutes. Should soften it up.", fromMe: true, time: "10:40" },
      { id: "5", text: "Any tips for the crust?", fromMe: false, time: "10:41" },
    ],
  },
  {
    id: "c2",
    user: "Tom Greenfield",
    bio: "Gardener · Woodworker",
    lastMessage: "What wood did you use?",
    time: "1h",
    unread: true,
    messages: [
      { id: "1", text: "That floating shelf looks incredible. What wood did you use?", fromMe: false, time: "09:10" },
      { id: "2", text: "Thanks! I went with 18mm oak-veneer plywood. Very stable.", fromMe: true, time: "09:14" },
      { id: "3", text: "What wood did you use?", fromMe: false, time: "09:15" },
    ],
  },
  {
    id: "c3",
    user: "Clara Webb",
    bio: "Macramé & textile artist",
    lastMessage: "The hanger turned out great!",
    time: "3h",
    unread: false,
    messages: [
      { id: "1", text: "Thanks for the macramé tips — the plant hanger turned out great!", fromMe: false, time: "07:00" },
      { id: "2", text: "So glad! Post a photo when you can 😊", fromMe: true, time: "07:05" },
      { id: "3", text: "The hanger turned out great!", fromMe: false, time: "07:06" },
    ],
  },
  {
    id: "c4",
    user: "Priya Nair",
    bio: "Home cook from Chennai",
    lastMessage: "First-time curry tips?",
    time: "1d",
    unread: false,
    messages: [
      { id: "1", text: "Do you have any advice for someone trying curry from scratch for the first time?", fromMe: false, time: "Yesterday" },
      { id: "2", text: "Start with the paste — it makes all the difference. Fry it until the oil splits.", fromMe: true, time: "Yesterday" },
      { id: "3", text: "First-time curry tips?", fromMe: false, time: "Yesterday" },
    ],
  },
]

interface MessagesPanelProps {
  open: boolean
  onClose: () => void
}

function MessagesPanel({ open, onClose }: MessagesPanelProps) {
  const [convos, setConvos] = useState(CONVERSATIONS)
  const [active, setActive] = useState<Conversation>(CONVERSATIONS[0])
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { targetUser } = useMessages()

  useEffect(() => {
    if (open && targetUser) {
      const match = convos.find((c) => c.user === targetUser)
      if (match) setActive(match)
    }
  }, [open, targetUser])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [open, active])

  function selectConvo(c: Conversation) {
    setActive(c)
    setConvos((prev) =>
      prev.map((p) => (p.id === c.id ? { ...p, unread: false } : p))
    )
  }

  function sendMessage() {
    if (!draft.trim()) return
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: draft.trim(),
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setConvos((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text }
          : c
      )
    )
    setActive((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }))
    setDraft("")
    inputRef.current?.focus()
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  const totalUnread = convos.filter((c) => c.unread).length

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-14 h-[calc(100vh-3.5rem)] w-[580px] max-w-full z-50 flex bg-white border-l border-gray-100 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Conversations list ── */}
        <div className="w-52 flex-shrink-0 flex flex-col border-r border-gray-100">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">Messages</p>
              {totalUnread > 0 && (
                <span className="text-[10px] bg-sienna/10 text-sienna font-bold px-1.5 py-0.5 rounded-full">
                  {totalUnread}
                </span>
              )}
            </div>
            <button className="p-1 rounded text-gray-400 hover:text-phthalo transition-colors" aria-label="New message">
              <BsPencilSquare size={14} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {convos.map((c) => (
              <button
                key={c.id}
                onClick={() => selectConvo(c)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150 ${
                  active.id === c.id
                    ? "bg-phthalo/5 border-r-2 border-phthalo"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <UserAvatar size="sm" />
                  {c.unread && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-phthalo rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-xs truncate ${c.unread ? "font-semibold text-ink" : "font-medium text-gray-700"}`}>
                      {c.user}
                    </p>
                    <p className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{c.time}</p>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">{c.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat area ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <UserAvatar size="sm" />
              <div>
                <p className="text-sm font-semibold text-ink">{active.user}</p>
                <p className="text-[11px] text-gray-400">{active.bio}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-ink transition-all duration-200 text-lg leading-none"
              aria-label="Close messages"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
            {active.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
              >
                {!msg.fromMe && (
                  <div className="mr-2 flex-shrink-0 self-end mb-1">
                    <UserAvatar size="sm" />
                  </div>
                )}
                <div className={`max-w-[72%] flex flex-col gap-1 ${msg.fromMe ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.fromMe
                        ? "bg-phthalo text-white rounded-br-sm"
                        : "bg-gray-100 text-ink rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-gray-400 px-1">{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 border border-gray-100 focus-within:border-phthalo/30 focus-within:bg-white transition-all duration-200">
              <input
                ref={inputRef}
                type="text"
                placeholder={`Message ${active.user}…`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-gray-400 outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!draft.trim()}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-phthalo text-white disabled:opacity-30 hover:bg-phthalo/85 transition-all duration-200"
                aria-label="Send"
              >
                <BsSend size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { type MessagesPanelProps }
export default MessagesPanel
