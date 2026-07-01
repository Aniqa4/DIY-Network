'use client'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import PopularBlogs from "./sections/PopularBlogs"
import CategoryPage from "./sections/categories/CategoryPage"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import ActiveRoute from "../../components/ActiveRoute"

const CATEGORIES = [
  { to: "/",            label: "All" },
  { to: "/cooking",     label: "Cooking" },
  { to: "/painting",    label: "Painting" },
  { to: "/gardening",   label: "Gardening" },
  { to: "/sewing",      label: "Sewing" },
  { to: "/crafting",    label: "Crafting" },
  { to: "/woodworking", label: "Woodworking" },
  { to: "/knitting",    label: "Knitting" },
]

interface HomeProps {
  hideHero?: boolean
}

function Home({ hideHero = false }: HomeProps) {
  const [scrolling, setScrolling] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const heading =
    pathname === "/"
      ? "All Posts"
      : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 0)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-white min-h-screen">
      <div
        className={
          scrolling
            ? "fixed left-0 right-0 top-0 z-20 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
            : "fixed left-0 right-0 top-0 z-20 bg-white border-b border-gray-100"
        }
      >
        <Navbar
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
      </div>

      <div className="pt-14">
        <div className="max-w-7xl mx-auto flex">
          <Sidebar isOpen={sidebarOpen} />

          <main className="flex-1 min-w-0 px-8 py-6">
            {!sidebarOpen && (
              <div className="flex gap-2 overflow-x-auto pb-4 -mx-8 px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {CATEGORIES.map(({ to, label }) => (
                  <div key={to} className="flex-shrink-0">
                    <ActiveRoute to={to}>{label}</ActiveRoute>
                  </div>
                ))}
              </div>
            )}

            {pathname === "/" && !hideHero && <PopularBlogs />}

            <section className="py-8">
              <h2 className="font-ProtestStrike text-2xl text-ink mb-6">{heading}</h2>
              <CategoryPage />
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Home
