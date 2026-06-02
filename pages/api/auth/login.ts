import type { NextApiRequest, NextApiResponse } from 'next'
import type { AuthResponse } from '@/types/auth'

type ResponseData = { data: AuthResponse } | { error: string }

const MOCK_USERS = [
  {
    id: '1',
    email: 'test@test.com',
    password: 'password123',
    name: 'Test User',
  },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const authResponse: AuthResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: 'mock-jwt-token-' + user.id,
    }

    return res.status(200).json({ data: authResponse })
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
