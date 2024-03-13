'use client'

import { api } from '@/api/baseUrl'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import styles from './login.module.css'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await api.post("sessions", {
      email,
      password
    })

    localStorage.setItem("token", response.data.token)

    router.push('/product')
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder='Email'
          className={styles.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          className={styles.input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button variant="contained" color="secondary" type="submit">Confirmar</Button>
      </form>
    </main>
  );
}