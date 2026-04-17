// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const content = getMetafieldValue(post.metadata?.content)

  return (
    <article className="container-custom py-12 max-w-4xl">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-sm font-medium px-3 py-1 bg-brand-50 text-brand-700 rounded-full hover:bg-brand-100 transition-colors"
            >
              {getMetafieldValue(cat.metadata?.name) || cat.title}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>

      {author && (
        <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 mb-8 group">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-12 h-12 rounded-full object-cover"
              width={48}
              height={48}
            />
          )}
          <div>
            <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </div>
            <div className="text-sm text-gray-500">Author</div>
          </div>
        </Link>
      )}

      {featuredImage && (
        <div className="aspect-video overflow-hidden rounded-2xl mb-8 bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
            width={800}
            height={450}
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-brand-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </article>
  )
}