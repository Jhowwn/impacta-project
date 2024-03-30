import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  it('Should be able to register', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
