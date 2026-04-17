import Link from 'next/link'
import { getAllPosts, getAllAuthors, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function HomePage() {
  const [posts, authors, categories] = await Promise.all([
    getAllPosts(),
    getAllAuthors(),
    getAllCategories(),
  ])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-purple-50 py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Welcome to <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">My Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A creative space for stories, ideas, and inspiration. Explore posts from our talented authors.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container-custom py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Post</h2>
          <Link href={`/posts/${featuredPost.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100">
              {featuredPost.metadata?.featured_image && (
                <div className="aspect-video md:aspect-auto overflow-hidden bg-gray-100">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={600}
                    height={400}
                  />
                </div>
              )}
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-4">Read this featured article from our collection.</p>
                <span className="text-brand-600 font-semibold">Read more →</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="container-custom py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link href="/posts" className="text-brand-600 font-semibold hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{posts.length}</div>
            <div className="text-gray-600 font-medium">Posts</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{authors.length}</div>
            <div className="text-gray-600 font-medium">Authors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-brand-600 mb-2">{categories.length}</div>
            <div className="text-gray-600 font-medium">Categories</div>
          </div>
        </div>
      </section>
    </div>
  )
}