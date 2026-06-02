import type { NextPage } from 'next'
import { withAuth } from '@/components/auth/withAuth'
import { useAppSelector } from '@/hooks/useAppSelector'
import ProfileLayout from '@/components/layout/ProfileLayout'

const ProfilePage: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <ProfileLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Overview</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Name</h2>
            <p className="text-lg text-gray-900">{user?.name}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
            <p className="text-lg text-gray-900">{user?.email}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">User ID</h2>
            <p className="text-lg text-gray-900 font-mono">{user?.id}</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Welcome to EventApp!</h3>
          <p className="text-sm text-blue-800">
            Browse amazing events, book your tickets, and manage your orders all in one place.
          </p>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default withAuth(ProfilePage)
