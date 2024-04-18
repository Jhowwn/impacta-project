import axios from 'axios'

import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

const token = cookies.get('token')

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: { Authorization: `Bearer ${token}` },
})
