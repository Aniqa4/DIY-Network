'use client'
import { useState, useRef, type ReactNode, type ChangeEvent } from "react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import UserAvatar from "../../components/UserAvatar"
import { useToast } from "../../context/ToastContext"
import { LuCamera, LuArrowRight, LuUser, LuStar, LuLock, LuCircleAlert } from "react-icons/lu"

const ALL_CATEGORIES = ["Cooking", "Painting", "Gardening", "Sewing", "Crafting", "Woodworking", "Knitting"]

const fieldCls = "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-phthalo/20 focus:border-phthalo/50 transition-all bg-white"
const labelCls = "block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5"

type Section = "profile" | "preferences" | "security" | "danger"

const NAV: { id: Section; label: string; icon: ReactNode; danger?: boolean }[] = [
  { id: "profile",     label: "Profile",     icon: <LuUser size={14} /> },
  { id: "preferences", label: "Preferences", icon: <LuStar size={14} /> },
  { id: "security",    label: "Security",    icon: <LuLock size={14} /> },
  { id: "danger",      label: "Danger Zone", icon: <LuCircleAlert size={14} />, danger: true },
]

function Settings() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState<Section>("profile")

  const [name, setName] = useState("Marco Russo")
  const [email, setEmail] = useState("marco@example.com")
  const [bio, setBio] = useState("Home cook, amateur woodworker, and occasional gardener based in Rome.")
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const [categories, setCategories] = useState<string[]>(["Cooking", "Woodworking"])

  const toggleCategory = (cat: string) =>
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarSrc(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      <div className="fixed left-0 right-0 top-0 bg-white z-20 shadow-sm border-b border-gray-100">
        <Navbar />
      </div>

      <div className="pt-14">
        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-ProtestStrike text-3xl text-ink">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
          </div>

          <div className="flex gap-6 items-start">

            {/* Sidebar nav */}
            <aside className="w-44 flex-shrink-0 sticky top-20">
              <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {NAV.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all text-left ${
                      i < NAV.length - 1 ? "border-b border-gray-50" : ""
                    } ${
                      activeSection === item.id
                        ? item.danger
                          ? "text-red-500 bg-red-50"
                          : "text-phthalo bg-phthalo/[0.06]"
                        : item.danger
                          ? "text-gray-400 hover:text-red-400 hover:bg-red-50/60"
                          : "text-gray-500 hover:text-ink hover:bg-gray-50"
                    }`}
                  >
                    <span className="opacity-75">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content panel */}
            <div className="flex-1 min-w-0 space-y-4">

              {/* ── Profile ── */}
              {activeSection === "profile" && (
                <>
                  {/* Live preview card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="h-20 bg-gradient-to-r from-phthalo via-phthalo/80 to-sienna/60" />
                    <div className="px-6 pb-5">
                      <div className="flex items-end justify-between -mt-9 mb-3">
                        {/* Editable avatar */}
                        <div
                          className="relative w-[4.5rem] h-[4.5rem] rounded-full ring-4 ring-white cursor-pointer group flex-shrink-0"
                          onClick={() => avatarInputRef.current?.click()}
                        >
                          {avatarSrc ? (
                            <img src={avatarSrc} alt="Profile" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <div className="w-full h-full rounded-full bg-phthalo flex items-center justify-center">
                              <UserAvatar />
                            </div>
                          )}
                          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <LuCamera size={16} className="text-white" />
                          </div>
                          <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </div>
                        <Link
                          href="/user"
                          className="flex items-center gap-1 text-xs text-phthalo hover:underline pb-1 font-medium"
                        >
                          View profile <LuArrowRight size={11} />
                        </Link>
                      </div>
                      <p className="font-ProtestStrike text-lg text-ink leading-tight">{name || "Your name"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{email}</p>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">{bio || "Add a bio to your profile…"}</p>
                    </div>
                  </div>

                  {/* Edit form */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h2 className="font-semibold text-ink mb-4">Profile Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Display Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} className={fieldCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={fieldCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Bio</label>
                        <textarea
                          value={bio}
                          onChange={e => setBio(e.target.value)}
                          rows={3}
                          placeholder="Write something about yourself…"
                          className={`${fieldCls} resize-none`}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
                      <p className="text-xs text-gray-400">Changes are previewed above in real time.</p>
                      <button
                        onClick={() => toast("Profile updated!")}
                        className="px-5 py-2 bg-phthalo text-white text-sm rounded-full hover:bg-phthalo/90 transition-all font-medium"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* ── Preferences ── */}
              {activeSection === "preferences" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="font-semibold text-ink mb-1">Category Preferences</h2>
                  <p className="text-sm text-gray-500 mb-5">Choose the topics you care about to personalise your feed.</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                          categories.includes(cat)
                            ? "border-phthalo bg-phthalo/10 text-phthalo font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4">{categories.length} of {ALL_CATEGORIES.length} selected</p>
                  <div className="flex justify-end mt-5 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => toast("Preferences saved!")}
                      className="px-5 py-2 bg-phthalo text-white text-sm rounded-full hover:bg-phthalo/90 transition-all font-medium"
                    >
                      Save preferences
                    </button>
                  </div>
                </div>
              )}

              {/* ── Security ── */}
              {activeSection === "security" && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="font-semibold text-ink mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>Current Password</label>
                      <input type="password" className={fieldCls} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className={labelCls}>New Password</label>
                      <input type="password" className={fieldCls} placeholder="••••••••" />
                    </div>
                    <div>
                      <label className={labelCls}>Confirm New Password</label>
                      <input type="password" className={fieldCls} placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-5 pt-4 border-t border-gray-50">
                    <button
                      onClick={() => toast("Password updated!")}
                      className="px-5 py-2 bg-phthalo text-white text-sm rounded-full hover:bg-phthalo/90 transition-all font-medium"
                    >
                      Update password
                    </button>
                  </div>
                </div>
              )}

              {/* ── Danger Zone ── */}
              {activeSection === "danger" && (
                <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
                  <h2 className="font-semibold text-red-500 mb-1">Danger Zone</h2>
                  <p className="text-sm text-gray-500 mb-6">These actions are permanent and cannot be undone.</p>
                  <div className="rounded-xl bg-red-50 border border-red-100 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-red-600">Delete your account</p>
                      <p className="text-xs text-red-400 mt-0.5">Permanently removes your profile, posts, and all data.</p>
                    </div>
                    <button
                      onClick={() => toast("Account deletion is unavailable in demo mode.", "error")}
                      className="flex-shrink-0 px-4 py-2 text-sm rounded-full border border-red-200 text-red-500 hover:bg-red-100 transition-all font-medium"
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
