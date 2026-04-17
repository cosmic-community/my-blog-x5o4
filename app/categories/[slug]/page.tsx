// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) notFound()

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getMetafieldValue(category.metadata?.name) || category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-lg text-gray-600">{getMetafieldValue(category.metadata.description)}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}