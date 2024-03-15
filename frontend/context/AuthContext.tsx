'use client'

import { api } from "@/api/baseUrl";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

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
  SignOut: () => void
  user: User;
  isAuthenticated: boolean
}

type AuthproviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthproviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User>({ email: '', role: '' })
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'SignOut':
          SignOut();
          break;
        case 'signIn':
          router.push('/');
          break;
        default:
          break;
      }
    }
  })

  useEffect(() => {
    const token = cookies.get("usertoken")
    
    if (token) {
      api.get('/me', {
        headers: { Authorization: `Bearer ${token}`}
      }).then((response) => {
        if (!response.data) {
          throw new Error('erro')
        }
        
        const { email, role } = response.data

        setUser({ email, role })
      }).catch(() => {
        SignOut()
      })
    }
  })

  function SignOut() {
    cookies.remove('usertoken')
    authChannel.postMessage('SignOut')
    router.push('/login')
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token } = response.data

      if (!token) {
        return alert('fail to login')
      }

      cookies.set("usertoken", token, { 
        httpOnly: true, 
        maxAge: 60 * 60 * 24 * 30,
      })

      api.defaults.headers["Authorization"] = `Bearer ${token}`

      api.get('/me').then((response) => {
        if (!response.data) {
          throw new Error('erro')
        }
        const { email, role } = response.data


        setUser({ email, role })
      }).catch(() => {
        SignOut()
      })

      router.push('/')
      authChannel.postMessage('signIn')

    } catch (err) {
      console.error(err)
    }
  }

  if(!user || user === undefined) {
    SignOut()
  }

  return (
    <AuthContext.Provider value={{ signIn, SignOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
