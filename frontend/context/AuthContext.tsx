'use client'

import { api } from "@/api/baseUrl"
import Router from "next/router"
import { ReactNode, createContext, useEffect, useState } from "react"

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (credential: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User;
  isAuthenticated: boolean
}

type AuthproviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel;

export function signOut() {
  localStorage.removeItem("token")
  authChannel.postMessage('signOut')
  Router.push('/login')
}

export function AuthProvider({ children }: AuthproviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        case 'signIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      api.get('/me').then((response) => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      }).catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token, permissions, roles } = response.data

      localStorage.set("token", token, {
        expires: 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: '/',
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers["Authorization"] = `Bearer ${token}`

      Router.push('/')
      authChannel.postMessage('signIn')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
