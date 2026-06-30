'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { blogs } from "../data/blogs"

interface CategoryItem {
  to: string
  label: string
  count: number
}

const CATEGORIES: CategoryItem[] = [
  { to: "/",            label: "All",         count: blogs.length },
  { to: "/cooking",     label: "Cooking",     count: blogs.filter(b => b.categoryName === "Cooking").length },
  { to: "/painting",    label: "Painting",    count: blogs.filter(b => b.categoryName === "Painting").length },
  { to: "/gardening",   label: "Gardening",   count: blogs.filter(b => b.categoryName === "Gardening").length },
  { to: "/sewing",      label: "Sewing",      count: blogs.filter(b => b.categoryName === "Sewing").length },
  { to: "/crafting",    label: "Crafting",    count: blogs.filter(b => b.categoryName === "Crafting").length },
  { to: "/woodworking", label: "Woodworking", count: blogs.filter(b => b.categoryName === "Woodworking").length },
  { to: "/knitting",    label: "Knitting",    count: blogs.filter(b => b.categoryName === "Knitting").length },
]

function CategoryLink({ to, label, count }: CategoryItem) {
  const pathname = usePathname()
  const isActive = to === "/" ? pathname === "/" : pathname === to

  return (
    <Link
      href={to}
      scroll={false}
      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 border-l-2 ${
        isActive
          ? "border-phthalo bg-phthalo/10 text-ink font-semibold"
          : "border-transparent text-ink/55 hover:text-ink hover:border-canvas-dark font-medium"
      }`}
    >
      <span>{label}</span>
      <span className={`text-xs tabular-nums ${isActive ? "text-phthalo font-semibold" : "text-ink/30"}`}>
        {count}
      </span>
    </Link>
  )
}

interface SidebarProps {
  isOpen: boolean
}

function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden transition-all duration-300 ease-in-out border-r border-gray-100 ${
        isOpen ? "w-56" : "w-0 border-r-transparent"
      }`}
    >
      <div className="w-56 h-full overflow-y-auto flex flex-col py-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/35 mb-3 px-4">Categories</p>
        <nav className="flex flex-col" aria-label="Filter by category">
          {CATEGORIES.map((item) => (
            <CategoryLink key={item.to} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
