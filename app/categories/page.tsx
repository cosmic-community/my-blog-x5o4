import Link from 'next/link'
import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = { title: 'Categories - My Blog' }

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
      <p className="text-gray-600 mb-8">Browse posts by topic</p>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group bg-gradient-to-br from-brand-50 to-purple-50 rounded-xl p-8 hover:shadow-lg transition-all border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
                {getMetafieldValue(cat.metadata?.name) || cat.title}
              </h2>
              {cat.metadata?.description && (
                <p className="text-gray-600">{getMetafieldValue(cat.metadata.description)}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}