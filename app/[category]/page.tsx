import Home from '../../src/views/home/Home'

const CATEGORIES = ['cooking', 'painting', 'gardening', 'sewing', 'crafting', 'woodworking', 'knitting']

const CATEGORY_META: Record<string, { description: string; gradient: string; accent: string }> = {
  cooking:     { description: "Recipes, techniques, and kitchen projects from the community.",     gradient: "from-orange-100 via-amber-50 to-orange-50",   accent: "text-orange-600"  },
  painting:    { description: "Watercolours, oils, acrylics — explore every medium and style.",   gradient: "from-violet-100 via-purple-50 to-violet-50",  accent: "text-violet-600"  },
  gardening:   { description: "Grow guides, raised beds, and everything green.",                  gradient: "from-emerald-100 via-green-50 to-emerald-50", accent: "text-emerald-600" },
  sewing:      { description: "Patterns, alterations, and handmade garments.",                    gradient: "from-pink-100 via-rose-50 to-pink-50",        accent: "text-pink-600"    },
  crafting:    { description: "Paper, clay, resin — if you made it by hand, it belongs here.",   gradient: "from-amber-100 via-yellow-50 to-amber-50",    accent: "text-amber-600"   },
  woodworking: { description: "Builds, joinery tips, and workshop projects.",                     gradient: "from-stone-200 via-stone-100 to-stone-50",    accent: "text-stone-600"   },
  knitting:    { description: "Yarns, patterns, and cosy finished objects.",                      gradient: "from-sky-100 via-blue-50 to-sky-50",          accent: "text-sky-600"     },
}

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map(category => ({ category }))
}

type Props = { params: Promise<{ category: string }> }

export default async function CategoryPageRoute({ params }: Props) {
  const { category } = await params
  const meta = CATEGORY_META[category]
  const label = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <>
      {/* Category banner — replaces the hero on category routes */}
      {meta && (
        <div className={`bg-gradient-to-br ${meta.gradient} border-b border-gray-100`}>
          <div className="container mx-auto px-6 py-10 pt-20">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${meta.accent}`}>Category</p>
            <h1 className="font-ProtestStrike text-4xl text-ink mb-2">{label}</h1>
            <p className="text-sm text-gray-500 max-w-md">{meta.description}</p>
          </div>
        </div>
      )}
      <Home hideHero />
    </>
  )
}
