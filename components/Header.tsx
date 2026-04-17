import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
          My Blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-brand-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/posts" className="text-gray-700 hover:text-brand-600 font-medium transition-colors">
            Posts
          </Link>
          <Link href="/authors" className="text-gray-700 hover:text-brand-600 font-medium transition-colors">
            Authors
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-brand-600 font-medium transition-colors">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  )
}