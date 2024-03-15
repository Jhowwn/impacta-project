'use client'

import { Button } from '@mui/material'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import styles from './login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data)
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