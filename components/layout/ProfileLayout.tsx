import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

interface ProfileLayoutProps {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const router = useRouter()

  const isActive = (path: string) => router.pathname === path

  const navItems = [
    { path: '/profile', label: 'Profile Overview' },
    { path: '/profile/orders', label: 'My Orders' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">My Account</h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block px-4 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  )
}
