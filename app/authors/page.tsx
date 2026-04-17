import Link from 'next/link'
import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata = { title: 'Authors - My Blog' }

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Authors</h1>
      <p className="text-gray-600 mb-8">Meet the talented writers behind our content</p>

      {authors.length === 0 ? (
        <p className="text-gray-500">No authors yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 text-center"
            >
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  width={96}
                  height={96}
                />
              )}
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </h2>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {getMetafieldValue(author.metadata.bio)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}