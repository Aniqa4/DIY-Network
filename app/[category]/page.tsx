import Home from '../../src/views/home/Home'

const CATEGORIES = ['cooking', 'painting', 'gardening', 'sewing', 'crafting', 'woodworking', 'knitting']

export const dynamicParams = false

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

export default function CategoryPage() {
  return <Home />
}
