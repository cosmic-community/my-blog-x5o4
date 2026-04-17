// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
            width={128}
            height={128}
          />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getMetafieldValue(author.metadata?.name) || author.title}
        </h1>
        {author.metadata?.bio && (
          <p className="text-lg text-gray-600">{getMetafieldValue(author.metadata.bio)}</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts by this author</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
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