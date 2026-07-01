'use client'
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HiOutlineSaveAs } from "react-icons/hi"
import { BsEnvelope } from "react-icons/bs"
import { LuUser, LuSettings, LuLogOut } from "react-icons/lu"
import UserAvatar from "./UserAvatar"
import InboxDropdown from "./InboxDropdown"
import SearchBar from "./SearchBar"
import { useMessages } from "../context/MessagesContext"
import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { logout } from "../redux/features/auth/authSlice"
import { useToast } from "../context/ToastContext"

interface NavbarProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}

function Navbar({ onToggleSidebar, sidebarOpen }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const { dmOpen, openDm, closeDm } = useMessages()
  const savedCount = useAppSelector(state => state.saved.ids.length)
  const { user, isLoggedIn } = useAppSelector(state => state.auth)
  const unreadCount = useAppSelector(state => state.notifications.items.filter(n => !n.read).length)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = () => {
    setProfileOpen(false)
    dispatch(logout())
    toast("Signed out", "info")
    router.push("/login")
  }

  return (
    <>
      <nav className="h-14 bg-inherit">
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full gap-6">

            {/* Left — toggle + logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                  className="flex flex-col gap-[5px] p-1.5 rounded text-ink/40 hover:text-ink hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="block w-[18px] h-px bg-current" />
                  <span className={`block h-px bg-current transition-all duration-300 ${sidebarOpen ? "w-[11px]" : "w-[18px]"}`} />
                  <span className="block w-[18px] h-px bg-current" />
                </button>
              )}

              <Link href="/" className="flex items-center gap-2 group">
                <span className="w-1.5 h-6 bg-phthalo rounded-full flex-shrink-0 group-hover:bg-sienna transition-colors duration-300" />
                <span className="font-ProtestStrike text-xl text-ink tracking-tight group-hover:text-phthalo transition-colors duration-200">
                  DIY Network
                </span>
              </Link>
            </div>

            {/* Center — search */}
            <div className="hidden md:flex flex-1 max-w-sm">
              <SearchBar />
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-1">

              {/* Saved */}
              <Link
                href="/saved"
                aria-label={`Saved posts (${savedCount})`}
                className="relative p-2 rounded-lg text-gray-500 hover:text-ink hover:bg-gray-100 transition-all duration-200"
              >
                <HiOutlineSaveAs size={19} />
                {savedCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1 right-1 text-[8px] font-bold bg-phthalo text-white w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none"
                  >
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Notifications bell */}
              <InboxDropdown unreadCount={unreadCount} />

              {/* Direct messages */}
              <button
                onClick={() => dmOpen ? closeDm() : openDm()}
                aria-label="Direct messages"
                className={`relative p-2 rounded-lg transition-all duration-200 ${
                  dmOpen
                    ? "bg-phthalo/10 text-phthalo"
                    : "text-gray-500 hover:text-ink hover:bg-gray-100"
                }`}
              >
                <BsEnvelope size={18} />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-sienna text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  2
                </span>
              </button>

              <div className="w-px h-5 bg-gray-200 mx-2" />

              {/* Not logged in → Sign in link */}
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="text-sm font-medium px-4 py-1.5 rounded-full border border-gray-200 text-ink/70 hover:border-phthalo hover:text-phthalo transition-all duration-200"
                >
                  Sign in
                </Link>
              )}

              {/* Logged in → Profile dropdown */}
              {isLoggedIn && (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setProfileOpen(v => !v)}
                    aria-label="Profile menu"
                    aria-expanded={profileOpen}
                    className={`rounded-full transition-all duration-200 ${
                      profileOpen
                        ? "ring-2 ring-phthalo ring-offset-1"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                    }`}
                  >
                    <UserAvatar />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2.5 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.08] z-50 overflow-hidden">

                      {/* Mini profile header */}
                      <div className="px-4 py-3.5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <UserAvatar />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-ink truncate">{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1.5">
                        <Link
                          href="/user"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-ink transition-colors"
                        >
                          <LuUser size={14} className="text-gray-400 flex-shrink-0" />
                          View profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-ink transition-colors"
                        >
                          <LuSettings size={14} className="text-gray-400 flex-shrink-0" />
                          Settings
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors group"
                        >
                          <LuLogOut size={14} className="text-gray-400 flex-shrink-0 group-hover:text-red-400 transition-colors" />
                          Sign out
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
