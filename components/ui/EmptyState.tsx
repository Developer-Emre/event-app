import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({ message, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <p className="text-gray-600 text-lg mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
