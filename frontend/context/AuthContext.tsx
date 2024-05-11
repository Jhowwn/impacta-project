'use client'

import { api } from '@/api/baseUrl'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'

import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

type User = {
  email: string
  role: string
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credential: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticated: boolean
}

type AuthproviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthproviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User>({ email: '', role: '' })
  const isAuthenticated = !!user

  function signOut() {
    cookies.remove('usertoken')
    authChannel.postMessage('signOut')
    router.push('/login')
  }

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break
        case 'signIn':
          router.push('/')
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const token = cookies.get('token')

    if (token) {
      api
        .get('/me')
        .then((response) => {
          if (!response.data) {
            throw new Error('erro')
          }

          const { email, role } = response.data

          setUser({ email, role })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { token } = response.data

      if (!token) {
        return alert('fail to login')
      }

      cookies.set('token', token, {
        maxAge: 60 * 60 * 24 * 30,
      })

      api
        .get('/me')
        .then((response) => {
          if (!response.data) {
            throw new Error('erro')
          }
          const { email, role } = response.data

          setUser({ email, role })
        })
        .catch(() => {
          signOut()
        })

      authChannel.postMessage('signIn')
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (!user || user === undefined) {
    signOut()
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
