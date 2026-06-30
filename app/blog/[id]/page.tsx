import BlogDetails from '../../../src/views/blogDetails/BlogDetails'
import { getBlogById } from '../../../src/data/blogs'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const blog = getBlogById(id)
  if (!blog) return { title: 'Blog not found — DIY Network' }
  return {
    title: `${blog.blogTitle} — DIY Network`,
    description: blog.description.slice(0, 160),
    openGraph: {
      title: blog.blogTitle,
      description: blog.description.slice(0, 160),
      type: 'article',
    },
  }
}

export default function BlogDetailsPage() {
  return <BlogDetails />
}
