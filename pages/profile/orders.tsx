import type { NextPage } from 'next'
import { withAuth } from '@/components/auth/withAuth'
import { useAppSelector } from '@/hooks/useAppSelector'
import ProfileLayout from '@/components/layout/ProfileLayout'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useRouter } from 'next/router'

const OrdersPage: NextPage = () => {
  const router = useRouter()
  const { orders } = useAppSelector((state) => state.orders)

  if (orders.length === 0) {
    return (
      <ProfileLayout>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

          <EmptyState
            message="You haven't made any orders yet."
            icon={
              <svg
                className="w-24 h-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
            action={
              <Button onClick={() => router.push('/')}>
                Browse Events
              </Button>
            }
          />
        </div>
      </ProfileLayout>
    )
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <Badge variant="orange">{orders.length} Order{orders.length > 1 ? 's' : ''}</Badge>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt)
            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-orange-300 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {order.eventTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <Badge variant="success">Confirmed</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Date</p>
                    <p className="text-sm font-medium">
                      {orderDate.toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      ₺{order.totalPrice.toLocaleString('tr-TR')}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {order.seats.map((seat) => (
                      <Badge key={seat.id} variant="default">
                        {seat.row}{seat.number}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Contact Information</p>
                      <p>
                        <span className="font-medium">Name:</span> {order.personalInfo.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {order.personalInfo.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {order.personalInfo.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Delivery Address</p>
                      <p>{order.personalInfo.street}</p>
                      <p>
                        {order.personalInfo.district}, {order.personalInfo.city}
                      </p>
                      <p>Turkey</p>
                      {order.personalInfo.address && (
                        <p className="text-xs text-gray-600 mt-1">
                          {order.personalInfo.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ProfileLayout>
  )
}

export default withAuth(OrdersPage)
