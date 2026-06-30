export interface Blog {
  id: string
  blogTitle: string
  nameOfWriter: string
  categoryName: string
  views: number
  likes: number
  saved: number
  description: string
  ingredients: string[]
  postedAt: string
  imageUrl?: string
}
