import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EventApp
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                router.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              Events
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className={`${
                    router.pathname === '/profile'
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  } hover:text-blue-600 transition-colors`}
                >
                  Profile
                </Link>
                <Link
                  href="/profile/orders"
                  className={`${
                    router.pathname === '/profile/orders'
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  } hover:text-blue-600 transition-colors`}
                >
                  My Orders
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {user?.name}</span>
                  <Button onClick={handleLogout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
