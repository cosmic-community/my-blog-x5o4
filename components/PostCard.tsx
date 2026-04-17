import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function PostCard({ post }: { post: Post }) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {featuredImage && (
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={225}
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((cat) => (
                <span key={cat.id} className="text-xs font-medium px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                  {getMetafieldValue(cat.metadata?.name) || cat.title}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
            {post.title}
          </h2>
          {author && (
            <div className="flex items-center gap-2 mt-auto pt-4">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full object-cover"
                  width={32}
                  height={32}
                />
              )}
              <span className="text-sm text-gray-600">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}